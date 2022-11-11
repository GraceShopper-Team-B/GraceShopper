const router = require("express").Router();
// const Order = require("../db");

const {
  models: { Product, User, Order, Cart_Item },
} = require("../db");
// const Order = require("../db/models/Order");
// module.exports = router;

// GET / api / cart / userId;
router.get("/:userId", async (req, res, next) => {
  try {
    const cart = await Order.findAll({
      where: {
        userId: `${req.params.userId}`,
      },
      include: [
        {
          all: true,
          nested: true,
        },
      ],
    });
    console.log("cart ----->", cart);
    // const cart = await Cart_Item.findOne({
    //   where: {
    //     userId: `${req.params.userId}`,
    //   },
    // include: [Cart_Item],
    // });

    // const cart = await User.findByPk(req.params.userId, {
    //   include: {
    //     model: Order,
    // },
    // });
    res.status(200).json(cart);
    // const cartItem = await Order.findBy();
    // res.status(200).json(cartItem);
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

// router.get("/", async (req, res, next) => {
//   try {
//     const cart = await Cart_Item.findAll({
//       include: [
//         {
//           all: true,
//           nested: true,
//         },
//       ],
//     });
//     res.status(200).json(cart);
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
