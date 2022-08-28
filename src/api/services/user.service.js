const User = require("../models/User");

const saveUser = async (email, password) => {
  const repository = new User();
  return await repository.save({ email, password });
}

module.exports = saveUser;