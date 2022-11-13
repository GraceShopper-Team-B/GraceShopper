const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  address: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  pending: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Order;
