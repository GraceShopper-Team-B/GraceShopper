const router = require("express").Router();

const {
  models: { Cart_Item },
} = require("../db");
module.exports = router;

//GET /api/cart
router.get("/", async (req, res, next) => {
  try {
    const cartItem = await Order.getCart_item();
    res.status(200).json(cartItem);
  } catch (err) {
    next(err);
  }
});

//POST /api/cart
router.post("/", async (req, res, next) => {
  try {
    const addedToCart = await Order_Products.create(req.body);
    res.send(addedToCart);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
