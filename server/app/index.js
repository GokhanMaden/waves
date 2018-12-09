const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

//Models
require('./user').init(app);
require('./brand').init(app);
require('./wood').init(app);
require('./product').init(app);

//Middlewares
require('./authentication/auth')
require('./authentication/admin')

require('../config/config');

module.exports = app;