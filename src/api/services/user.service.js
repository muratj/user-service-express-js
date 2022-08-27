const client = require("../../configs/db.config");
const User = require("../models/User");

const saveUser = async (email, password) => {
  const repository = new User(client);
  return await repository.save({ email, password });
}

module.exports = saveUser;