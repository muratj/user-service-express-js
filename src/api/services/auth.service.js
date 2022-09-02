const { validatePassword, generateAccessToken } = require("../utils/common");
const { findUserByEmail } = require("./user.service");
const { UnauthorizedException } = require('../models/Exception');

const validateUser = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) return new UnauthorizedException('User not exists')
  const validUser = await validatePassword(password, user.password);
  if (!validUser) return new UnauthorizedException('Incorrect login credentials');
  const payload = { id: user.id, email: user.email, role: user.role };
  return await generateAccessToken(payload);
}

module.exports = { validateUser }