const User = require("../models/User");

const repository = new User();

const saveUser = async (reqBody) => {
  return await repository.save(reqBody);
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