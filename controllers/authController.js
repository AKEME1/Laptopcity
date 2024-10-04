const JWT = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/userModel');
const AppError = require('../utils/appErorr');
const catchAsync = require('../utils/catchAsync');
const Email = require('../utils/email');

const createToken = (id) => {
  return JWT.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = createToken(user.id);
  res.status(200).json({
    status: 'success',
    data: {
      data: user,
    },
    token: token,
  });
};

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  //chacking if the header exist with barrear token
  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(JWT.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});

exports.restrictTo = (role) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (userRole === role) {
      next();
    }

    next(new AppError('You are not authorized for this service', 403));
  };
};

exports.signin = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);
  await new Email(user).sendWelcome();

  createSendToken(user, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  const user = await User.findOne({ email });
  if (!user || (await !user.correctPassword(password, user.id))) {
    return next(new AppError('Incorrect email or password', 401));
  }
  const token = createToken(user.id);
  res.status(200).json({
    status: 'sucess',
    data: {
      data: user,
    },
    token: token,
  });
});
