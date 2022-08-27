const Repository = require('./Repository');

class User extends Repository {
  constructor(client) {
    super(client);
  }

  id;
  email;
  password;
}

module.exports = User;