const express = require('express');
const bodyParser = require('body-parser');
require('./configs/environment')();
const PORT = process.env.PORT || 5000;
const app = express();

const logger = require('./api/middlewares/Logger');
const UserRoute = require('./api/routes/user.route');
const AuthRoute = require('./api/routes/auth.route');
const { BadRequestException } = require('./api/models/Exception');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/user', UserRoute);
app.use('/auth', AuthRoute);
app.all('*', (req, res) => res.status(404).json(new BadRequestException("endpoint not found")));

app.listen(PORT, () => {
  console.clear();
  logger.info(`App is running on port ${PORT}`);
});