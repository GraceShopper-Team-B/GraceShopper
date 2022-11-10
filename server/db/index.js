//this is the access point for all things database related!

const db = require("./db");

const Product = require("./models/Product");
const User = require("./models/User");
const Order = require("./models/Order");
const Cart_Item = require("./models/Cart_Item");

//associations could go here!
User.hasMany(Order);
Order.hasMany(Product);
Order.belongsTo(User);
Product.hasMany(Order);

Product.belongsToMany(User, { through: "favorites" });
Product.belongsToMany(Order, { through: Cart_Item });
Order.belongsToMany(Product, { through: Cart_Item });

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    Cart_Item,
  },
};
