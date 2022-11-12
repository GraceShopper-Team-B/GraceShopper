const router = require("express").Router();

const {
  models: { Product, User, Order, Cart_Item },
} = require("../db");

router.get("/:itemId", async (req, res, next) => {
  try {
    const id = req.params.itemId;
    const cartItem = await Cart_Item.findByPk(id);

    res.status(200).json(cartItem);
  } catch (error) {
    next(error);
  }
});

//increment
router.put("/increment", async (req, res, next) => {
  try {
    const { itemId } = req.body;
    const itemInCart = await Cart_Item.findByPk(itemId);

    res.json(await itemInCart.increment("quantity"));
  } catch (error) {
    next(error);
  }
});

//decrement
router.put("/decrement", async (req, res, next) => {
  try {
    const { itemId } = req.body;
    const itemInCart = await Cart_Item.findByPk(itemId);
    res.json(await itemInCart.decrement("quantity"));
  } catch (error) {
    next(error);
  }
});

//delete
router.delete("/:itemId", async (req, res, next) => {
  try {
    const id = req.params.itemId;
    const cartItem = await Cart_Item.destroy({
      where: { id: id },
    });
    res.status(200).json(cartItem);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
