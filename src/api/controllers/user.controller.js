const userService = require('../services/user.service');

const Users = require('../models/User').User;

const getAllUsers = async (req, res) => {
  const users = await userService.findAllUsers();
  res.json(users);
}

const getUserById = async (req, res) => {
  const userId = req.params.id;
  const user = await userService.findUserById(userId);
  res.json(user);
}

const createUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.saveUser(email, password);
  res.json(user);
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser
}