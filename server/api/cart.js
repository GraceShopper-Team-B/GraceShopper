const router = require("express").Router();

const {
  models: { Product, User, Order, Cart_Item },
} = require("../db");

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
    res.status(200).json(cart);
  } catch (err) {
    next(err);
  }
});

//PUT /api/cart/ userId
//increment
router.put("/userId/increment", async (req, res, next) => {
  try {
    const { itemId } = req.body;
    const itemInCart = await Cart_Item.findByPk(itemId);

    res.json(await itemInCart.increment("quantity"));
  } catch (error) {
    next(error);
  }
});

//decrement
router.put("/userId/decrement", async (req, res, next) => {
  try {
    const { itemId } = req.body;
    const itemInCart = await Cart_Item.findByPk(itemId);
    res.json(await itemInCart.decrement("quantity"));
  } catch (error) {
    next(error);
  }
});

//FUN PUT IDEA //DELETE
// router.put("/userId/delete", async (req, res, next) => {
//   try {
//     const { id } = req.body;
//     // const deletedItem = await Cart_Item.findByPk(id);
//     await deletedItem.delete(id);
//     res.json("deleted");
//   } catch (error) {
//     next(error);
//   }
// });

//FUN PUT IDEA //delete
// router.put("/userId/delete", async (req, res, next) => {
//   try {
//     const { id } = req.body;
//     const itemInCart = await Cart_Item.findByPk(id);
//     res.json(await itemInCart.destroy());
//   } catch (error) {
//     next(error);
//   }
// });

// DELETE / api / cart / userId;
// router.delete("/userId", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const itemInCart = await Cart_Item.findByPk(id);
//     res.json(await itemInCart.destroy());
//   } catch (error) {
//     next(error);
//   }
// });

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
