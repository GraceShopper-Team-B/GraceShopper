const Sequelize = require("sequelize");
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const axios = require("axios");
const Order = require("./Order");

const SALT_ROUNDS = 5;
// const secret = "secret";

const User = db.define("user", {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
    // validate: {
    //   isEmail: {
    //     msg: "Please enter a correct email",
    //   },
    // },
  },
  phoneNumber: {
    type: Sequelize.TEXT,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: true,
    // validate: {
    //   notNull: {
    //     msg: "Please enter your correct address.",
    //   },
    // },
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  token: {
    type: Sequelize.TEXT,
  },
});

module.exports = User;

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function () {
  // return jwt.sign({ id: this.id }, secret);
  return jwt.sign({ id: this.id }, process.env.JWT);
};

/**
 * classMethods
 */
User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({ where: { username } });
  if (!user || !(await user.correctPassword(password))) {
    const error = Error("Incorrect username/password");
    error.status = 401;
    throw error;
  }
  const token = await user.generateToken();
  await user.update({ token: token });
  return token;
};

User.findByToken = async function (token) {
  try {
    console.log("in method", token);
    const { id } = await jwt.verify(token, process.env.JWT);

    // const { id } = await jwt.verify(token, secret);
    const user = User.findByPk(
      id
      //   {
      //   include: [Order],
      //   order: [[Order, "id", "DESC"]],
      // }
    );
    if (!user) {
      throw "nooo";
    }

    return user;
  } catch (ex) {
    console.log("Error", ex);
    const error = Error("bad token");
    error.status = 401;
    throw error;
  }
};

/**
 * hooks
 */
const hashPassword = async (user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));
