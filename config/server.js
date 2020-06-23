const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
let expressValidator = require('express-validator');

let app = express();

// Setar as variaveis que a view engine
app.set('view engine', 'ejs');
app.set('views', './app/views');

//middlewares
app.use(express.static('./app/public'));
// body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app)

module.exports = app;