const db = require('../database');
const Promise = require('bluebird');

const userExists = (username, password) => {
  return new Promise((resolve, reject) => {
    db.User
    .find({
      username: username,
      password: password
    })
    .exec((err, user) => {
      if (!err && user.length !== 0) { resolve(true); }
      else { resolve(false); }
    });
  });
};

const verifyUser = (req, res, next) => {
  console.log(req.body)
  let username = req.body.username;
  let password = req.body.password;
  return userExists(username, password)
  .then((item) => {
    console.log('item', item)
    if (!item) {
      res.send({errorMessage: 'user not found'});
    } else {
      next();
    }
  })
};

const usernameExists = (username) => {
  return new Promise((resolve, reject) => {
    db.User
    .find({
      username: username,
    })
    .exec((err, user) => {
      if (!err && user.length !== 0) { resolve(true); }
      else { resolve(false); }
    });
  });
};

const createUser = (req, res, next) => {
  return usernameExists(req.body.username)
  .then((item) => {
    if (!item) {
      let newUser = new db.User(req.body);
      newUser.save(() => {
        console.log('saved: ', req.body.username);
        next();
      });
    } else {
      res.send({errorMessage: 'username already exists'});
    }
  });
};

module.exports.verifyUser = verifyUser;
module.exports.createUser = createUser;
