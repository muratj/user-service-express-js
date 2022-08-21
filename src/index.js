const express = require('express');

require('./configs/environment')();

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`App is running on port ${PORT}`));