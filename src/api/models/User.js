const { Pool, Client } = require('pg');
const Repository = require('../middlewares/Repository');

const db_configs = require('../../configs/db.config');

class User extends Repository {
  constructor() {
    super(new Pool(db_configs));
    this.createTableIfNotExists(new Client(db_configs), this.entity);
  };

  entity = {
    id: {
      dataType: 'serial',
      constraints: ['PRIMARY KEY']
    },
    email: {
      dataType: 'VARCHAR(50)',
      constraints: ['UNIQUE', 'NOT NULL']
    },
    password: {
      dataType: 'VARCHAR',
      constraints: ['NOT NULL']
    },
    firstName: {
      dataType: 'VARCHAR(20)',
      constraints: ['NOT NULL']
    },
    lastName: {
      dataType: 'VARCHAR(20)',
      constraints: ['NOT NULL']
    },
    role: {
      dataType: 'VARCHAR(10)',
      constraints: ['NOT NULL', 'DEFAULT \'user\'']
    }
  };
}

module.exports = User;