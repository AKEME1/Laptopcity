const multer = require('multer');
const catchAsync = require('../utils/catchAsync');
const Product = require('../models/productModel');
const factory = require('./handlerFactory');
const AppError = require('../utils/appErorr');

const cloudinary = require('../config/cloudinaryConfig');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.imageProcess = upload.array('images', 4);

exports.UploadImages = catchAsync(async (req, res, next) => {
  const urls = [];
  const uploadPromiss = req.files.map((file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream((err, result) => {
          if (result) {
            urls.push(result.secure_url);
            resolve();
          } else {
            reject(err);
          }
        })
        .end(file.buffer);
    });
  });
  await Promise.all(uploadPromiss);
  req.imageUrls = urls;
  next();
});

exports.topProduct = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-price';
  req.query.fields =
    'brand,price,model,specifications.ram,specifications.gpu,specifications.batterylife';
  next();
};

exports.getAllProducts = factory.getAll(Product);
exports.getOne = factory.getOne(Product);
exports.updateOne = factory.updateOne(Product);
exports.deleteOne = factory.deleteOne(Product);

exports.createOne = catchAsync(async (req, res, next) => {
  const images = req.imageUrls;
  const specifications = JSON.parse(req.body.specifications);
  const { brand, model, stock } = req.body;

  // Use findOneAndUpdate with await to get the updated or created product
  const createdProduct = await Product.findOneAndUpdate(
    {
      brand,
      model,
      specifications: { $eq: specifications }, // Ensure specifications match exactly
    },
    {
      $inc: { stock: stock !== undefined ? stock : 1 }, // Increment stock; default to 1 if not provided
      $set: { images }, // Update images if necessary
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
