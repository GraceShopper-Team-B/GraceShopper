const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  address: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  product: {
    type: Sequelize.TEXT,
  },
  fufilled: {
    type: Sequelize.BOOLEAN,
  },
});

module.exports = Order;
