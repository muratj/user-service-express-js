const authService = require('../services/auth.service');

const login = async (req, res) => {
  const { email, password } = req.body;
  const auth = await authService.validateUser(email, password);
  if (auth.error) {
    res.status(auth.statusCode).json(auth);
    return;
  };
  res.json(auth);
}

module.exports = { login }