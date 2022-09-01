const { expressjwt: jwt } = require('express-jwt');

const jwtGuard = () => {
  return jwt({ secret: process.env.ACCESS_TOKEN_SECRET, algorithms: ["HS256"] });
}

module.exports = jwtGuard;