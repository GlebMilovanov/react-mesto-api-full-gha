const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const { validateCreateCard, validateCardId } = require('../validations/cardValidations');

router.get('/', getCards);
router.post('/', validateCreateCard, createCard);

router.use('/:cardId', validateCardId);
router.delete('/:cardId', deleteCardById);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
