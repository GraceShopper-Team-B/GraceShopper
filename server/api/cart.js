const router = require("express").Router();
const { requireToken } = require("./gatekeeping");

const {
  models: { Product, User, Order, Cart_Item },
} = require("../db");

// GET / api / cart / userId;
router.get("/:userId/home", requireToken, async (req, res, next) => {
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

router.get("/:orderId", async (req, res, next) => {
  try {
    const cart = await Order.findByPk(req.params.orderId, {
      include: [{ all: true, nested: true }],
    });
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
});

router.put("/:orderId/checkout", async (req, res, next) => {
  try {
    const item = await Order.findByPk(req.params.orderId);
    item.update({ pending: false });
    if (item.userId) {
      const address = item.address;
      const userId = item.userId;
      const newCart = Order.create({ userId, address });
      res.status(201).json(newCart);
    } else {
      res.json(item);
    }
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

// Guest checkout route:
router.post("/create", async (req, res, next) => {
  try {
    const newCart = await Order.create();
    res.status(200).json(newCart);
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
