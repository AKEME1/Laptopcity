const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appErorr');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: 'succues',
    data: {
      data: users,
    },
  });
});

exports.createOne = catchAsync(async (req, res, next) => {
  const createdUser = await User.create(req.body);
  res.status(200).json({
    status: 'succues',
    data: {
      data: createdUser,
    },
  });
});

exports.getOne = catchAsync(async (req, res, next) => {
  const getUser = await User.findById(req.params.userID);
  res.status(200).json({
    status: 'succues',
    data: {
      data: getUser,
    },
  });
  if (!getUser) {
    next(new AppError('No document found with the Id', 404));
  }
});

exports.updateone = catchAsync(async (req, res, next) => {
  const updateUser = await User.findByIdAndUpdate(req.params.userID, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'succues',
    data: {
      data: updateUser,
    },
  });
  if (!updateUser) {
    next(new AppError('No document found with the Id', 404));
  }
});

exports.deleteOne = catchAsync(async (req, res, next) => {
  const deletedUser = await User.findByIdAndDelete(req.params.userID);

  if (!deletedUser) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: null,
    },
  });
});
