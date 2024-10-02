const catchAsync = require('../utils/catchAsync');
const Product = require('../models/productModel');
const factory = require('./handlerFactory');
const APIFeatures = require('../utils/appFeature');
const appError = require('../utils/appErorr');

exports.topProduct = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-price';
  req.query.fields =
    'brand,price,model,specifications.ram,specifications.gpu,specifications.batterylife'; // Include only the desired fields

  next(); // Proceed to the next middleware/controller
};

exports.getAllProducts = factory.getAll(Product);
exports.getOne = factory.getOne(Product);
exports.updateOne = factory.updateOne(Product);
exports.deleteOne = factory.deleteOne(Product);

exports.createOne = catchAsync(async (req, res, next) => {
  const { brand, model, specifications, stock } = req.body;

  // Use findOneAndUpdate with await to get the updated or created product
  const createdProduct = await Product.findOneAndUpdate(
    {
      brand,
      model,
      specifications,
    },
    {
      $inc: { stock: stock || 1 }, // Increment stock; default to 1 if not provided
    },
    { new: true, upsert: true } // Return the updated document and create if not found
  );

  // Send response with the created or updated product
  res.status(200).json({
    status: 'success',
    data: {
      data: createdProduct, // Return the created or updated product
    },
  });
});
