const logger = require("../middlewares/Logger");

class Repository {
  dbPool;
  tableName;
  entity;
  constructor(dbPool) {
    this.dbPool = dbPool;
    this.tableName = `${process.env.TABLE_SCHEMA}.${(this.constructor.name).toLowerCase()}`;
  }

  async execute(queryString, values) {
    try {
      await this.dbPool.connect();
      const res = await this.dbPool.query(queryString, values);
      return res;
    } catch (err) {
      logger.error(err);
    }
  }

  async createTableIfNotExists(dbClient, entity) {
    const columns = this.entityToSqlColumnList(entity);
    const queryString = `CREATE TABLE IF NOT EXISTS ${this.tableName} (${columns});`;

    try {
      await dbClient.connect();
      await dbClient.query(queryString);
      return true;
    } catch (error) {
      console.error(error.stack);
      return false;
    } finally {
      await dbClient.end();
    }
  }

  entityToSqlColumnList(entity) {
    const columns = [];
    const columnNames = Object.keys(entity);
    columnNames.forEach(columnName => {
      const columnInfo = [];
      const column = entity[columnName];
      columnInfo.push(columnName)
      columnInfo.push(column.dataType);
      columnInfo.push(column.constraints.join(' '));
      columns.push(columnInfo.join(' '));
    });
    return columns.join(', ');
  }

  async save(dto) {
    const keys = Object.keys(dto);
    const values = [];
    keys.forEach(key => { values.push(dto[key]) });
    const valuesCount = keys.map((key, index) => `$${index + 1}`);
    const queryString = `INSERT INTO ${this.tableName} (${keys.join()}) VALUES (${valuesCount}) RETURNING *`;
    try {
      const res = await this.execute(queryString, values);
      return res.rows[0];
    } catch (err) {
      logger.error(err);
    }
  }

  async findOne(id) {
    const queryString = `SELECT * FROM ${this.tableName} WHERE id = ${id}`;
    try {
      const res = await this.execute(queryString);
      return res.rows[0];
    } catch (err) {
      logger.error(err);
    }
  }

  async findAll() {
    const queryString = `SELECT * FROM ${this.tableName}`;
    try {
      const res = await this.execute(queryString);
      return res.rows;
    } catch (err) {
      logger.error(err);
    }
  }
}

module.exports = Repository;