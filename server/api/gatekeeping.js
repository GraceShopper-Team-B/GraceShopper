const {
  models: { User },
} = require("../db");

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    // console.log("req.headers in requireToken ----->", req.headers);
    // console.log("token in requireToken", token);

    const user = await User.findByToken(token);
    console.log("user in requireToken", user);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).send("You do not have access");
  } else {
    next();
  }
};

module.exports = {
  requireToken,
  isAdmin,
};
