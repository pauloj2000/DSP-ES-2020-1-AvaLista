
const { getUsuarios } = require('../model/usuarios/usuarios');
const { cadastrarUsuario } = require('../model/usuarios/usuarios');

module.exports = function (app, restrict, logger) {
  app.get('/usuario', restrict, function (req, res) {
    logger.info("Acessou página de usuários.");

    getUsuarios(function (err, usuarios) {
      if (!err) {
        res.render('pages/usuario', {
          usuarios: usuarios
        });
      } else {
        req.session.error = err;
        res.render('pages/usuario', {
          usuarios: [],
        });
      }
    });
  });

  app.get('/usuario/cadastrar', restrict, function (req, res) {
    logger.info("Acessou página de usuários - cadastrar.");
    res.render('pages/usuarioCadastrar');
  });

  app.post('/usuario/cadastrar', restrict, function (req, res) {
    logger.info('Acessou post de usuario.');

    const { nome, email, senha } = req.body;

    cadastrarUsuario(nome, email, senha, function (err, result) {
      console.log('Err, result', err, result);
      if (err) {
        req.session.error = result;
      } else {
        req.session.success = 'Cadastro bem sucedido.'
      }
      res.redirect('/usuario');
    });

  })
}
