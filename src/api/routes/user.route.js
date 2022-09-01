const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/user.controller');
const jwtGuard = require('../guards/jwt.guard');

router.post('/', createUser);
router.get('/', jwtGuard(), getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;