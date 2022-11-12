const router = require("express").Router();

const {
  models: { Product, User, Order, Cart_Item },
} = require("../db");

router.get("/:itemId", async (req, res, next) => {
  try {
    const id = req.params.itemId;
    console.log("-------->", id);
    const cartItem = await Cart_Item.findByPk(id);

    res.status(200).json(cartItem);
  } catch (error) {
    next(error);
  }
});

router.delete("/:itemId", async (req, res, next) => {
  try {
    const id = req.params.itemId;
    const cartItem = await Cart_Item.findByPk(id);
    await cartItem.destroy();
    res.status(200).json(cartItem);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
