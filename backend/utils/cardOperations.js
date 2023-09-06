const Card = require('../models/cards');
const NotFoundError = require('./errors/notFoundError');

async function likeCard(cardId, userId) {
  const card = await Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  ).orFail(() => new NotFoundError('Запрашиваемая карточка не найдена'));

  return card;
}

async function dislikeCard(cardId, userId) {
  const card = await Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true },
  ).orFail(() => new NotFoundError('Запрашиваемая карточка не найдена'));

  return card;
}

module.exports = {
  likeCard,
  dislikeCard,
};
