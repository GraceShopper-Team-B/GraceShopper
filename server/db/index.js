//this is the access point for all things database related!

const db = require("./db");

const Product = require("./models/Product");
const User = require("./models/User");
const Order = require("./models/Order");
const Order_Products = require("./models/Order_Products");

//associations could go here!

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    Order_Products,
  },
};
