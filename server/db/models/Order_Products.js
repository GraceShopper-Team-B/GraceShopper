const Sequelize = require("sequelize");
const db = require("../db");

const Order_Products = db.define("order_products", {
  num_items: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  total_price: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Order_Products;
