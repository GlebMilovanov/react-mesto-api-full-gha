const router = require('express').Router();
const { login, createUser, logout } = require('../controllers/users');
const usersRoutes = require('./users');
const cardsRoutes = require('./cards');
const auth = require('../middlewares/auth');
const { validateLogin, validateCreateUser } = require('../validations/userValidations');
const NotFoundError = require('../utils/errors/notFoundError');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);

router.use(auth);

router.post('/logout', logout);

router.use('/users', usersRoutes);
router.use('/cards', cardsRoutes);

// Not Found (404) Handler
router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
