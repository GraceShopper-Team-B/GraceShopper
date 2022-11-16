const router = require("express").Router();

const {
  models: { Product, User, Order, Cart_Item },
} = require("../db");

// GET / api / cart / userId;
router.get("/:userId/home", async (req, res, next) => {
  try {
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

module.exports = router;
