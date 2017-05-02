const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Promise = require('bluebird');

const app = express();

app.set('views', '../react-client/dist/');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../react-client/dist'));

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

module.exports = app;
