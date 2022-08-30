const User = require("../models/User");
const { hashPassword } = require("../utils/common");

const repository = new User();

const saveUser = async (newUser) => {
  newUser.password = await hashPassword(newUser.password);
  return await repository.save(newUser);
}

const findUserById = async (userId) => {
  const user = await repository.findOne(userId);
  delete user.password;
  return user;
}

const findAllUsers = async () => {
  const users = await repository.findAll();
  users.forEach(user => {
    delete user.password;
  });
  return users;
}

const updateUserById = async (userId, payload) => {
  return await repository.update(userId, payload);
}

const deleteUserById = async (userId) => {
  return await repository.delete(userId);
}

module.exports = { saveUser, findUserById, findAllUsers, updateUserById, deleteUserById };