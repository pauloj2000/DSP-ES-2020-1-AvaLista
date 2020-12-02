'use strict';

module.exports = function (app, restrict) {
  app.get('/', function (req, res) {
    res.render('auth/login');
  });

  app.get('/login', function (req, res) {
    res.render('auth/login');
  });

  app.get('/generic', restrict, function (req, res) {
    res.render('pages/generic');
  });

  app.get('/element', restrict, function (req, res) {
    res.render('pages/element');
  });

  app.get('/restricted', restrict, function (req, res) {
    res.send('Wahoo! Accessou a área restrita, clique para realizar o <a href="/logout">logout</a>');
  });

};