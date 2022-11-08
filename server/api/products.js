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
