const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const {
  getAllUser, getUserById, createUser, getCurrentUser, getUserProfileUpdate, getAvatarUpdate,
} = require('../controllers/users');

const validateURL = (value) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new Error('Неправильный формат ссылки');
  }
  return value;
};

router.get('/', getAllUser);
router.get('/me', getCurrentUser);
router.get(
  '/:userId',
  celebrate({ params: Joi.object().keys({ userId: Joi.string().required().hex().length(24) }) }),
  getUserById,
);
router.post('/', createUser);
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30).required(),
    }),
  }),
  getUserProfileUpdate,
);
router.patch(
  '/me/avatar',
  celebrate(
    {
      body: Joi.object().keys({ avatar: Joi.string().required().custom(validateURL) }),
    },
  ),
  getAvatarUpdate,
);

module.exports = router;
