const router = require("express").Router();
const {
  models: { User, Order },
} = require("../db");
module.exports = router;

router.post("/login", async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

// router.post("/signup", async (req, res, next) => {
//   try {
//     const { username, password } = req.body;
//     const user = await User.create({ username, password });
//     res.send({ token: await user.generateToken() });
//   } catch (err) {
//     if (err.name === "SequelizeUniqueConstraintError") {
//       res.status(401).send("User already exists");
//     } else {
//       next(err);
//     }
//   }
// });

router.post("/signup", async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      password,
      phoneNumber,
      email,
      address,
      username,
    } = req.body;
    const newUser = await User.create({
      firstName,
      username,
      lastName,
      password,
      phoneNumber,
      email,
      address,
    });
    const { id } = newUser;
    const newCart = await Order.create({ userId: id });
    res.status(201).json({ newUser, newCart });
  } catch (error) {
    next(error);
  }
});

router.get("/me", async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});
