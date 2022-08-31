const authService = require('../services/auth.service');

const login = async (req, res) => {
  const auth = await authService.loginUser(req.body);
  if (auth.error) {
    res.status(auth.statusCode).json(auth);
    return;
  };
  res.json(auth);
}

module.exports = { login }