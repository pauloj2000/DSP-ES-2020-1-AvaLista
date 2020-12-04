module.exports = function (app, restrict, logger) {
  app.get('/jogos', restrict, function (req, res) {
    logger.info("Acessou página de jogos.");

    res.render('pages/jogos');
  });
}
