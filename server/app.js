// dependencies
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Promise = require('bluebird');

// other module exports
const auth = require('./auth.js');

// initialize and set up app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../react-client/dist'));

// routes
// user identity has to be verified before he/she reaches the homepage (?)
app.get('/', auth.verifySession, (req, res) => {
  res.render('index');
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.get('/login', (req, res) => {
  res.render('login');
});

module.exports = app;
