const db = require('../database');

const usernameExists = (username) => {
  db.User
  .find({
    username: username,
  })
  .exec((err, user) => {
    if (!err && user) { return true; }
    else { return false; }
  });
};

const userExists = (username, password) => {
  db.User
  .find({
    username: username,
    password: password
  })
  .exec((err, user) => {
    if (!err && user) { return true; }
    else { return false; }
  });
};

const verifyUser = (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  if (!userExists(username, password)) {
    res.send({errorMessage: 'user not found'});
  } else {
    next();
  }
}

const createUser = (req, res, next) => {
  if (!usernameExists) {
    let newUser = new db.User(req.body);
    newUser.save(() => {
      console.log('saved: ', req.body.username);
      next();
    });
  } else {
    res.send({errorMessage: 'username already exists'});
  }
}

module.exports.verifyUser = verifyUser;
module.exports.createUser = createUser;
