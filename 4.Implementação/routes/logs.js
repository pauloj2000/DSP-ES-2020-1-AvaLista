const fs = require('fs');

module.exports = function (app, restrict, logger) {
  app.get('/logs', restrict, function (req, res) {
    logger.fatal("Erro fatal ao acessar a página de logs, brincadeirinha.");

    // **modify your existing code here**
    fs.readFile('logs/logsDoSistema.txt', 'utf8', (e, data) => {
      if (e) throw e;
      console.error("Data:", data);
      res.render('pages/logs', {
        linhasLog: data
      });
    });


  });
}