const { HTTP_STATUS_OK } = require('http2').constants;
const mongoose = require('mongoose');
const ValidationError = require('../errors/validationError');
const { updateUserInformation } = require('../userOperations');

// user decorator
const withUserResponse = (handler) => async (req, res, next) => {
  try {
    const { status, data } = await handler(req);
    return res.status(status).send({ data });
  } catch (err) {
    return next(err);
  }
};

// update user decorator
const withUpdateUserResponse = (updateDataHandler) => async (req, res, next) => {
  try {
    const updateData = updateDataHandler(req);
    const user = await updateUserInformation(req.user._id, updateData);
    return res.status(HTTP_STATUS_OK).send({ data: user });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new ValidationError('Переданы некорректные данные'));
    }
    if (err instanceof mongoose.Error.CastError) {
      return next(new ValidationError('Неверный ID'));
    }
    return next(err);
  }
};

module.exports = {
  withUserResponse,
  withUpdateUserResponse,
};
