const catchAsync = require("../utils/catchAsync");
const Product = require("../models/productModel");
const appError = require("../utils/appErorr");

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const product = await Product.find();
  res.status(200).json({
    status: "succuss",
    data: {
      data: product,
    },
  });
});

exports.createOne = catchAsync(async (req, res, next) => {
  const productCreated = await Product.create(req.body);
  res.status(200).json({
    status: "succuss",
    data: {
      data: productCreated,
    },
  });
});

exports.getOne = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.productID);
  if (Product) {
    next(new appError("No document found with the Id", 404));
  }
  res.status(200).json({
    status: "succuss",
    data: {
      data: product,
    },
  });
});

exports.updateOne = catchAsync(async (req, res, next) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.productID,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatedProduct) {
    next(new appError("No document found with the Id", 404));
  }
  res.status(200).json({
    status: "succuss",
    data: {
      data: updatedProduct,
    },
  });
});

exports.deleteOne = catchAsync(async (req, res, next) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.productID);
  if (!deletedProduct) {
    next(new appError("No document found with the Id", 404));
  }
  res.status(200).json({
    status: "succuss",
    data: {
      data: null,
    },
  });
});
