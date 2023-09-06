const User = require('../models/user');
const NotFoundError = require('./errors/notFoundError');

async function findUserById(id) {
  const user = await User.findById(id).orFail(new NotFoundError('Запрашиваемый пользователь не найден'));
  return user;
}
async function updateUserInformation(userId, updateData) {
  const user = await User.findByIdAndUpdate(
    userId,
    updateData,
    {
      new: true,
      runValidators: true,
    },
  ).orFail(new NotFoundError('Запрашиваемый пользователь не найден'));

  return user;
}

module.exports = {
  findUserById,
  updateUserInformation,
};
