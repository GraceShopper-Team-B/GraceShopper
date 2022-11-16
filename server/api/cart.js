const router = require("express").Router();
const { requireToken } = require("./gatekeeping");

const {
  models: { Product, User, Order, Cart_Item },
} = require("../db");

// GET / api / cart / userId;
router.get("/:userId", requireToken, async (req, res, next) => {
  try {
    if (req.user.id !== +req.params.userId) {
      return res.status(403).send("You do not have access");
    }

    const cart = await Order.findAll({
      where: {
        userId: `${req.params.userId}`,
        pending: true,
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

router.put("/:userId/checkout", async (req, res, next) => {
  try {
    const { orderId } = req.body;
    const { userId } = req.body;
    const item = await Order.findByPk(orderId);

    item.update({ pending: false });
    const address = item.address;
    const newCart = Order.create({ userId, address });
    res.status(200).json(newCart);
  } catch (error) {
    next(err);
  }
});

router.put("/userId/updateAddress", async (req, res, next) => {
  try {
    const { address } = req.body;
    const { orderId } = req.body;
    const cart = await Order.findByPk(orderId, {
      include: [{ all: true, nested: true }],
    });
    const updatedCart = await cart.update({ address });
    res.status(200).json(updatedCart);
  } catch (error) {
    next(error);
  }
});
//PUT /api/cart/ userId
//increment
// router.put("/userId/increment", async (req, res, next) => {
//   try {
//     const { itemId } = req.body;
//     const itemInCart = await Cart_Item.findByPk(itemId);

//     res.json(await itemInCart.increment("quantity"));
//   } catch (error) {
//     next(error);
//   }
// });

// //decrement
// router.put("/userId/decrement", async (req, res, next) => {
//   try {
//     const { itemId } = req.body;
//     const itemInCart = await Cart_Item.findByPk(itemId);
//     res.json(await itemInCart.decrement("quantity"));
//   } catch (error) {
//     next(error);
//   }
// });

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
