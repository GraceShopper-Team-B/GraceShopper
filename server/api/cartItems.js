const router = require("express").Router();

const {
  models: { Product, User, Order, Cart_Item },
} = require("../db");

//API/CARTITEMS
router.get("/", async (req, res, next) => {
  try {
    const allCartItems = await Cart_Item.findAll();
    res.status(200).json(allCartItems);
  } catch (error) {
    next(error);
  }
});

//API/CARTITEMS/ITEMID
router.get("/:itemId", async (req, res, next) => {
  try {
    const id = req.params.itemId;
    const cartItem = await Cart_Item.findByPk(id);

    res.status(200).json(cartItem);
  } catch (error) {
    next(error);
  }
});


// get everything in cart with the orderId
//API CARTITEMS/ORDER/ORDERID
router.get("/order/:orderId", async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const cart = await Cart_Item.findAll({
      where: {
        orderId: orderId,
      },
    });
    console.log(orderId);
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
});

//increment
//API/CARTITEMS/INCREMENT

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
//API/CARTITEMS/DECREMENT
router.put("/decrement", async (req, res, next) => {
  try {
    const { itemId } = req.body;
    const itemInCart = await Cart_Item.findByPk(itemId);
    res.json(await itemInCart.decrement("quantity"));
  } catch (error) {
    next(error);
  }
});

//add to cart
//API/CARTITEMS
router.post("/", async (req, res, next) => {
  try {
    const { productId } = req.body;
    const { orderId } = req.body;
    const newCartItem = await Cart_Item.create({
      productId: productId,
      orderId: orderId,
    });
    res.json(newCartItem);
  } catch (error) {
    next(error);
  }
});

//delete
//API/CARTITEMS/ITEMID

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
