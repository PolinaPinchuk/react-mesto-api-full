const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const {
  createCard, getCards, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

const validateURL = (value) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new Error('Неправильный формат ссылки');
  }
  return value;
};

router.get('/', getCards);
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      link: Joi.string().custom(validateURL).required(),
    }),
  }),
  createCard,
);
router.delete(
  '/:cardId',
  celebrate({ params: Joi.object().keys({ cardId: Joi.string().required().length(24).hex() }) }),
  deleteCard,
);
router.put(
  '/:cardId/likes',
  celebrate({ params: Joi.object().keys({ cardId: Joi.string().required().length(24).hex() }) }),
  likeCard,
);
router.delete(
  '/:cardId/likes',
  celebrate({ params: Joi.object().keys({ cardId: Joi.string().required().length(24).hex() }) }),
  dislikeCard,
);

module.exports = router;
