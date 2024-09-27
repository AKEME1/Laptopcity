const express = require("express");
const productControllers = require("../controllers/productControllers");
const router = express.Router();

router
  .route("/")
  .get(productControllers.getAllProducts)
  .post(productControllers.createOne);

router
  .route("/:productID")
  .get(productControllers.getOne)
  .patch(productControllers.updateOne)
  .delete(productControllers.deleteOne);

module.exports = router;
