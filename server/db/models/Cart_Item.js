const Sequelize = require("sequelize");
const db = require("../db");

const Cart_Item = db.define("cartItem", {
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
  // total_price: {
  //   type: Sequelize.INTEGER,
  // },
});

Cart_Item.delete = async function (id) {
  const item = await Cart_Item.findByPk(id);
  return await item.destroy();
};

module.exports = Cart_Item;
