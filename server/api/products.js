const router = require("express").Router();
const {
  models: { Product },
} = require("../db");
module.exports = router;

//GET /api/products
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});

//GET /api/products/:id
router.get("/:id", async (req, res, next) => {
  try {
    const singleProduct = await Product.findByPk(req.params.id);
    res.status(200).send(singleProduct);
  } catch (error) {
    next(error);
  }
});

// // GET /api/products/update/:productId
// router.get("/update/:productId", async (req, res, next) => {
//   try {
//     const product = await Product.findByPk(req.params.productId);
//     // product.get({ name, type, image, price, description, quantity });
//     res.json(product);
//   } catch (error) {
//     next(error);
//   }
// });

//PUT /api/products/:productId/update
router.put("/:productId/update", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    res.json(await product.update(req.body));
  } catch (error) {
    next(error);
  }
});

// const { name, type, image, price, description, quantity } = req.body;
