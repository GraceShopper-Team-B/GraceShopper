const router = require("express").Router();
// const jwt = require("jsonwebtoken");

const { requireToken, isAdmin } = require("./gatekeeping");

const {
  models: { User, Order, Product },
} = require("../db");
module.exports = router;

router.get("/", requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:userId", requireToken, async (req, res, next) => {
  try {
    console.log("***user.id", req.user.id);
    console.log("***params.userId", +req.params.userId);
    if (req.user.id !== +req.params.userId) {
      return res.status(403).send("You do not have access");
    }
    const user = await User.findByPk(req.params.userId, {
      include: [{ all: true, nested: true }],
    });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.put("/:userId/editProfile", requireToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      include: [{ all: true, nested: true }],
    });
    await user.update(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
});
