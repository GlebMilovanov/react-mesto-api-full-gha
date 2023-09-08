const { HTTP_STATUS_OK, HTTP_STATUS_CREATED } = require('http2').constants;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ValidationError = require('../utils/errors/validationError');
const ConflictError = require('../utils/errors/conflictError');
const config = require('../config');
const { findUserById } = require('../utils/userOperations');
const { withUserResponse, withUpdateUserResponse } = require('../utils/decorators/userDecorators');

const SALT_ROUNDS = 10;
const MONGO_DUPLICATE_ERROR_CODE = 11000;

// get user
const getUser = withUserResponse(async (req) => {
  const user = await findUserById(req.user._id);
  return {
    status: HTTP_STATUS_OK,
    data: user,
  };
});

// get user by ID
const getUserById = withUserResponse(async (req) => {
  const user = await findUserById(req.params.userId);
  return {
    status: HTTP_STATUS_OK,
    data: user,
  };
});

// update user info
const updateUserInfo = withUpdateUserResponse((req) => {
  const { name, about } = req.body;
  return { name, about };
});

// update user avatar
const updateUserAvatar = withUpdateUserResponse((req) => {
  const { avatar } = req.body;
  return { avatar };
});

// get all users
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.status(HTTP_STATUS_OK).send({ data: users });
  } catch (err) {
    return next(err);
  }
};

// login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findUserByCredentials(email, password);

    const token = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
      expiresIn: '7d',
    });

    return res
      .cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
        secure: true,
      })
      .send({ message: 'Успешная авторизация' });
  } catch (err) {
    return next(err);
  }
};

/* // logout
const logout = (req, res, next) => {
  try {
    return res
      .clearCookie('jwt', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      })
      .send({ message: 'Вы успешно вышли из системы' });
  } catch (err) {
    return next(err);
  }
}; */

// create new user
const createUser = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    const user = await User.create({ ...req.body, password: hash });
    const { password, ...userWithoutPassword } = user.toObject();
    return res.status(HTTP_STATUS_CREATED).send({ data: userWithoutPassword });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new ValidationError('Переданы некорректные данные'));
    }
    if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
      return next(new ConflictError('Пользователь с таким email уже существует'));
    }
    return next(err);
  }
};

module.exports = {
  getUsers,
  login,
  /* logout, */
  createUser,
  updateUserInfo,
  updateUserAvatar,
  getUserById,
  getUser,
};
