const logger = require("./Logger");

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

  async findWhere(options) {
    const searchCriteria = [];
    const optionKeys = Object.keys(options);
    optionKeys.forEach(key => {
      searchCriteria.push(`${key} = '${options[key]}'`);
    })
    const queryString = `SELECT * FROM ${this.tableName} WHERE ${searchCriteria.join(' AND ')}`;
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

  async update(id, payload) {
    const keys = Object.keys(payload);
    const values = [];
    const setValue = [];
    keys.forEach((key, index) => {
      values.push(payload[key]);
      setValue.push(`${key} = $${index + 1}`);
    });
    const queryString = `UPDATE ${this.tableName} SET ${setValue.join(', ')} WHERE id = ${id}`;
    try {
      const res = await this.execute(queryString, values);
      const resMessage = {}
      if (res.rowCount) {
        resMessage.message = "Successfully updated"
      } else {
        resMessage.message = "Nothing to update"
      }
      resMessage.affectedRows = res.rowCount;
      return resMessage;
    } catch (err) {
      logger.error(err);
    }
  }

  async delete(id) {
    const queryString = `DELETE FROM ${this.tableName} WHERE id = ${id}`;
    try {
      const res = await this.execute(queryString);
      const resMessage = {}
      if (res.rowCount) {
        resMessage.message = "Successfully deleted"
      } else {
        resMessage.message = "Nothing to delete"
      }
      resMessage.affectedRows = res.rowCount;
      return resMessage;
    } catch (err) {
      logger.error(err);
    }
  }
}

module.exports = Repository;