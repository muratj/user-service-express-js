const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const hashPassword = async (password) => {
  const saltRounds = 12;
  let hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

const validatePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
}

const generateAccessToken = async (payload) => {
  return await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
}

module.exports = { hashPassword, validatePassword, generateAccessToken }