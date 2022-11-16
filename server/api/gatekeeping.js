const {
  models: { User },
} = require("../db");

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log("req.headers ----->", req.headers.authorization);
    console.log("token in requireToken", token);

    const user = await User.findByToken(token);
    console.log("user in requireToken", user);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  requireToken,
};
