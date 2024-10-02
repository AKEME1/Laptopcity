const express = require('express');
const productControllers = require('../controllers/productControllers');
const authControllers = require('../controllers/authController');
const router = express.Router();

router
  .route('/top-5-cheap')
  .get(productControllers.topProduct, productControllers.getAllProducts);

router
  .route('/')
  .get(authControllers.protect, productControllers.getAllProducts)
  .post(productControllers.createOne);

router
  .route('/:ID')
  .get(authControllers.protect, productControllers.getOne)
  .patch(productControllers.updateOne)
  .delete(productControllers.deleteOne);

module.exports = router;
