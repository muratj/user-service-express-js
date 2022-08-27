const express = require('express');
const bodyParser = require('body-parser');
require('./configs/environment')();
const PORT = process.env.PORT || 5000;
const app = express();

const UserRoute = require('./api/routes/user.route');
const logger = require('./api/middlewares/Logger');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/user', UserRoute);
app.all('*', (req, res) => res.status(404).json({ "code": 404, "description": "bad request", "message": "endpoint not found" }));

app.listen(PORT, () => {
  console.clear();
  logger.info(`App is running on port ${PORT}`);
});