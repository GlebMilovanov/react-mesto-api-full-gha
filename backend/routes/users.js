const router = require('express').Router();
const {
  getUsers,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
  getUser,
} = require('../controllers/users');
const { validateUserInfo, validateUserAvatar, validateUserId } = require('../validations/userValidations');

router.get('/', getUsers);
router.get('/me', getUser);
router.patch('/me', validateUserInfo, updateUserInfo);
router.patch('/me/avatar', validateUserAvatar, updateUserAvatar);
router.get('/:userId', validateUserId, getUserById);

module.exports = router;
