const User = require("../models/User");

const repository = new User();

const saveUser = async (email, password) => {
  return await repository.save({ email, password });
}

const findUserById = async (userId) => {
  return await repository.findOne(userId);
}

const findAllUsers = async () => {
  return await repository.findAll();
}

module.exports = { saveUser, findUserById, findAllUsers };