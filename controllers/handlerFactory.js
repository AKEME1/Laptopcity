const APIFeatures = require('../utils/appFeature');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appErorr');
exports.getAll = (Model) => {
  return catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const product = await features.query;

    res.status(200).json({
      status: 'succuss',
      result: product.length,
      data: {
        data: product,
      },
    });
  });
};

exports.getOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const { ID } = req.params;

    const doc = await Model.findById(ID);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });
};

exports.updateOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    console.log(req.params.ID, req.body);

    const doc = await Model.findByIdAndUpdate(req.params.ID, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });
};

exports.deleteOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.ID);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
};
