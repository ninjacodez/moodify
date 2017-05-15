const db = require('../database');
const Promise = require('bluebird');
const hash = require('./hash.js');

const userExists = (username, password) => {
  return new Promise((resolve, reject) => {
    let hashedPassword = hash.createHash(password);
    db.User
    .find({
      username: username,
      password: hashedPassword
    })
    .exec((err, user) => {
      if (!err && user.length !== 0) {
        resolve(true);
      } else { resolve(false); }
    });
  });
};

const verifyUser = (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  return userExists(username, password)
  .then((item) => {
    if (!item) {
      res.send({errorMessage: 'user not found'});
    } else {
      next();
    }
  });
};

const usernameExists = (username) => {
  return new Promise((resolve, reject) => {
    db.User
    .find({
      username: username,
    })
    .exec((err, user) => {
      if (!err && user.length !== 0) {
        resolve(true);
      } else { resolve(false); }
    });
  });
};

const createUser = (req, res, next) => {
  return usernameExists(req.body.username)
  .then((item) => {
    if (!item) {
      let username = req.body.username;
      let hashedPassword = hash.createHash(req.body.password);
      let newUser = new db.User({
        username: username,
        password: hashedPassword
      });
      newUser.save(() => {
        next();
      });
    } else {
      res.send({errorMessage: 'username already exists'});
    }
  });
};

module.exports.verifyUser = verifyUser;
module.exports.createUser = createUser;
