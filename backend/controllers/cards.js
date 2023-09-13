const { HTTP_STATUS_OK, HTTP_STATUS_CREATED } = require('http2').constants;
const mongoose = require('mongoose');
const Card = require('../models/cards');
const NotFoundError = require('../utils/errors/notFoundError');
const ValidationError = require('../utils/errors/validationError');
const ForbiddenError = require('../utils/errors/forbiddenError');
const { likeCard, dislikeCard } = require('../utils/cardOperations');
const { handleCardLikes } = require('../utils/decorators/cardDecorators');

// get all cards
module.exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    return res.status(HTTP_STATUS_OK).send(cards);
  } catch (err) {
    return next(err);
  }
};

// create card
module.exports.createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner: req.user._id });
    return res.status(HTTP_STATUS_CREATED).send(card);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new ValidationError('Переданы некорректные данные'));
    }
    return next(err);
  }
};

// delete card by id
module.exports.deleteCardById = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId).orFail(
      () => new NotFoundError('Запрашиваемая карточка не найдена'),
    );

    if (card.owner.toString() !== req.user._id) {
      return next(new ForbiddenError('Недостаточно прав для удаления этой карточки'));
    }

    await card.deleteOne();
    return res.status(HTTP_STATUS_OK).send(card);
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      return next(new ValidationError('Неверный ID'));
    }
    return next(err);
  }
};

// like card
module.exports.likeCard = handleCardLikes(likeCard);

// dislike card
module.exports.dislikeCard = handleCardLikes(dislikeCard);
