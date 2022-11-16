const router = require("express").Router();
const {
  models: { Product },
} = require("../db");

const { requireToken, isAdmin } = require("./gatekeeping");
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

//GET /api/products/:id/update
router.get("/:id/update", async (req, res, next) => {
  try {
    const singleProduct = await Product.findByPk(req.params.id);
    res.status(200).send(singleProduct);
  } catch (error) {
    next(error);
  }
});

//POST /api/products
router.post("/", async (req, res, next) => {
  try {
    console.log("req.body", req.body);
    res.status(201).send(await Product.create(req.body));
  } catch (error) {
    next(error);
  }
});

//PUT /api/products/:productId/update
router.put(
  "/:productId/update",
  requireToken,
  isAdmin,
  async (req, res, next) => {
    try {
      const product = await Product.findByPk(req.params.productId);
      res.json(await product.update(req.body));
    } catch (error) {
      next(error);
    }
});

//DELETE /api/products/:productId
router.delete("/:productId", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    console.log("Product in delete", product);
    await product.destroy();
    res.send(product);
  } catch (error) {
    next(error);
  }
});

