const db = require('../database');

const verifyUser = (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  if (!userExists(username, password)) {
    res.redirect('/login');
  } else {
    next();
  }
}

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

module.exports.verifyUser = verifyUser;

// const createSession = (req, res, next) => {
// };
//
// const verifySession = (req, res, next) => {
//   if (false) {
//     res.redirect('/login');
//   } else { next(); }
// };
//
// const isLoggedIn = (/* */) => {
// };

// module.exports.createSession = createSession;
