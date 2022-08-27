class Repository {
  client;
  tableName;
  constructor(client) {
    this.client = client;
    this.tableName = `${process.env.TABLE_SCHEMA}.${(this.constructor.name).toLowerCase()}`;
  }

  async query(client, queryString, values) {
    await client.connect();
    const res = await client.query(queryString, values);
    await client.end();
    return res;
  }

  async save(dto) {
    const keys = Object.keys(dto);
    const values = [];
    keys.forEach(key => { values.push(dto[key]) });
    const valuesCount = keys.map((key, index) => `$${index + 1}`);
    const queryString = `INSERT INTO ${this.tableName} (${keys.join()}) VALUES (${valuesCount}) RETURNING *`;
    const res = await this.query(this.client, queryString, values);
    return res.rows[0];
  }
}

module.exports = Repository;