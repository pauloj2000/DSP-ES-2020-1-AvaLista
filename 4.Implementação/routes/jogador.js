
const { getTimes } = require('../model/times/times');
const { cadastrarJogador } = require('../model/jogador/jogador');

module.exports = function (app, restrict, loggerError, loggerTrace) {
  loggerTrace.trace('Tela de jogadores acessada.');
  app.get('/jogador', restrict, function (req, res) {
    getTimes(function (err, times) {
      if (!err) {
        res.render('pages/jogador', {
          times: times
        });
      } else {
        req.session.error = err;
        res.render('pages/jogador', {
          times: [],
        });
      }
    });
  });

  app.post('/jogador', restrict, function (req, res) {
    loggerTrace.trace('Operação de cadastro de jogadores utilizada.');

    const { time, nome, dataNascimento, score } = req.body;

    cadastrarJogador(time, nome, dataNascimento, score, function (err, result) {
      console.log('Err, result', err, result);
      if (err) {
        req.session.error = result;
      } else {
        req.session.success = 'Cadastro bem sucedido.'
      }
      res.redirect('/times');
    });

  })
}
