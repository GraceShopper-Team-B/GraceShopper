const Sequelize = require("sequelize");
const db = require("../db");

const Order_Products = db.define("order_products", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    allowNull: false,
    validation: {
      min: 1,
    },
  },
  total_price: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Order_Products;
