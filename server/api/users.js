const router = require("express").Router();
// const jwt = require("jsonwebtoken");

const { requireToken } = require("./gatekeeping");

const {
  models: { User, Order, Product },
} = require("../db");
module.exports = router;

router.get("/", requireToken, async (req, res, next) => {
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

router.get("/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      include: [{ all: true, nested: true }],
    });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.put("/:userId/editProfile", async (req, res, next) => {
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
