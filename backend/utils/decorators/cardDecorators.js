const { HTTP_STATUS_OK } = require('http2').constants;
const mongoose = require('mongoose');
const ValidationError = require('../errors/validationError');

function handleCardLikes(actionFunction) {
  return async (req, res, next) => {
    try {
      const card = await actionFunction(req.params.cardId, req.user._id);
      return res.status(HTTP_STATUS_OK).send(card);
    } catch (err) {
      if (err instanceof mongoose.Error.CastError) {
        return next(new ValidationError('Неверный ID'));
      }
      return next(err);
    }
  };
}

module.exports = {
  handleCardLikes,
};
