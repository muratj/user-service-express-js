const saveUser = require('../services/user.service');

const Users = require('../models/User').User;

const getAllUsers = (req, res) => {
  res.json(Users);
}

const getUserById = (req, res) => {
  const user = Users.find(user => user.id == req.params.id);
  res.json(user);
}

const createUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await saveUser(email, password);
  res.json(user);
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser
}