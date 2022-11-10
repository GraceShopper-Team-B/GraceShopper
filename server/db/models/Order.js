const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  address: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
  product: {
    type: Sequelize.TEXT,
  },
  pending: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Order;
