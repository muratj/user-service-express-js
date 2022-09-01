const Exception = require('../models/Exception');
const userService = require('../services/user.service');

const createUser = async (req, res) => {
  const user = await userService.saveUser(req.body);
  res.json(user);
}

const getAllUsers = async (req, res) => {
  if (req.auth.role !== 'admin') {
    const exception = new Exception(403, 'Unauthorized', 'You are not authorized for this call');
    return res.status(exception.statusCode).json(exception);
  }
  const users = await userService.findAllUsers();
  res.json(users);
}

const getUserById = async (req, res) => {
  const userId = req.params.id;
  const user = await userService.findUserById(userId);
  res.json(user);
}

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const payload = req.body;
  const updatedRows = await userService.updateUserById(userId, payload);
  res.json(updatedRows);
}

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  const deletedRows = await userService.deleteUserById(userId);
  res.json(deletedRows);
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}