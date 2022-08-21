const path = require('path');

module.exports = () => {
  const pathToEnvFile = path.join(__dirname, `../../.${process.env.NODE_ENV}.env`);
  require('dotenv').config({path: pathToEnvFile});
}
