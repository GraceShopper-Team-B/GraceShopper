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

// router.post("/signup", async (req, res, next) => {
//   try {
//     const { firstName, lastName, password, phoneNumber, email, address } =
//       req.body;
//     const newUser = await User.create({
//       firstName,
//       lastName,
//       password,
//       phoneNumber,
//       email,
//       address,
//     });
//     console.log("I am a user", newUser);

//     res.status(201).json(newUser);
//   } catch (error) {
//     next(error);
//   }
// });

router.put("/:userId/editProfile", requireToken, async (req, res, next) => {
  try {
    if (req.user.id !== +req.params.userId) {
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
