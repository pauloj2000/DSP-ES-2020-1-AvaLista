'use strict';

// const bodyParser = require('body-parser');
// const jsonParser = bodyParser.json();
const authenticate = require('../model/auth/authenticate');

module.exports = function (app) {
  app.post('/login', function (req, res) {
    authenticate(req.body.email, req.body.password, function (err, user) {
      if (!err) {
        // Regenerate session when signing in
        // to prevent fixation
        req.session.regenerate(function () {
          // Store the user's primary key
          // in the session store to be retrieved,
          // or in this case the entire user object
          req.session.user = user;
          res.redirect('/times');
        });
      } else {
        req.session.error = user;
        res.redirect('/login');
      }
    });
  });

  app.get('/logout', function (req, res) {
    // destroy the user's session to log them out
    // will be re-created next request
    req.session.destroy(function () {
      res.redirect('/');
    });
  });

}