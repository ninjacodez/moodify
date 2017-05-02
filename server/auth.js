const createSession = (req, res, next) => {
};

const verifySession = (req, res, next) => {
  // TODO: modify the false below into an actual test (if the user is logged in)
  if (false) {
    res.redirect('/login');
  } else { next(); }
};

const isLoggedIn = (/* */) => {
};

module.exports.createSession = createSession;
module.exports.verifySession = verifySession;
