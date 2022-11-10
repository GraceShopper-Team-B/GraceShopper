const router = require("express").Router();
// const Order = require("../db");

const {
  models: { Order, Cart_Item },
} = require("../db");
// const Order = require("../db/models/Order");
// module.exports = router;

//GET /api/cart
router.get("/", async (req, res, next) => {
  try {
    const cartItem = await Order.getCart_Item();
    res.status(200).json(cartItem);
  } catch (err) {
    next(err);
  }
});

// //POST /api/cart
// router.post("/", async (req, res, next) => {
//   try {
//     const addedToCart = await Order.setCart_Item(req.body);
//     res.send(addedToCart);
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
