const User = require("../models/User");
const { hashPassword } = require("../utils/common");

const repository = new User();

const saveUser = async (newUser) => {
  newUser.password = await hashPassword(newUser.password);
  return await repository.save(newUser);
}

const findUserById = async (userId) => {
  return await repository.findOne(userId);
}

const findAllUsers = async () => {
  return await repository.findAll();
}

const updateUserById = async (userId, payload) => {
  return await repository.update(userId, payload);
}

const deleteUserById = async (userId) => {
  return await repository.delete(userId);
}

module.exports = { saveUser, findUserById, findAllUsers, updateUserById, deleteUserById };