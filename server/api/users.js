const router = require("express").Router();
// const jwt = require("jsonwebtoken");

const { requireToken, isAdmin } = require("./gatekeeping");

const {
  models: { User, Order, Product },
} = require("../db");
const { requireToken, isAdmin } = require("./gatekeeping");
module.exports = router;


router.get("/", requireToken, isAdmin, async (req, res, next) => {

  try {
    const users = await User.findAll({
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:userId", requireToken, async (req, res, next) => {
  try {
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
    if (!req.user.id === req.params.userId) {
      return res.status(403).send("You do not have access");
    }
    const user = await User.findByPk(req.params.userId, {
      include: [{ all: true, nested: true }],
    });
    await user.update(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
});
