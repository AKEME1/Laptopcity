const express = require('express');
const productControllers = require('../controllers/productControllers');
const authControllers = require('../controllers/authController');
const router = express.Router();

router
  .route('/')
  .get(authControllers.protect, productControllers.getAllProducts)
  .post(productControllers.createOne);

router
  .route('/:productID')
  .get(
    authControllers.protect,
    authControllers.restrictTo('admin'),
    productControllers.getOne
  )
  .patch(productControllers.updateOne)
  .delete(productControllers.deleteOne);

module.exports = router;
