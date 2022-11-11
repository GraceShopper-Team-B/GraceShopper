// const router = require("express").Router();
// const {
//   models: { Product, User, Order, Cart_Item },
// } = require("../db");

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
