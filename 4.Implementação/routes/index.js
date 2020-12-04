'use strict';

const { getTimes, importJogadores, exportJogadores } = require('../model/times/times');


const multer = require('multer');
const upload = multer({ dest: 'tmp/csv/' });

const csv = require('csv-parser');
const fs = require('fs');

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

  app.get('/times', restrict, function (req, res) {
    getTimes(function (err, times) {
      if (!err) {
        res.render('pages/times', {
          times: times
        });
      } else {
        req.session.error = err;
        res.render('pages/times', {
          times: [],
        });
      }
    });
  });

  app.get('/times/importar', restrict, function (req, res) {
    getTimes(function (err, times) {
      if (!err) {
        res.render('pages/timesImport', {
          times: times
        });
      } else {
        req.session.error = err;
        res.render('pages/timesImport', {
          times: [],
        });
      }
    });
  });

  app.post('/times/importar', upload.single('csv'), restrict, function (req, res) {
    const { time } = req.body;

    const fileRows = [];
    console.log('csv handler:', csv);

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (row) => {
        fileRows.push(row);
      })
      .on('end', () => {
        console.log('CSV file successfully processed');

        importJogadores(time, fileRows, function (err, result) {
          console.log('Err, result', err, result);
          if (err) {
            req.session.error = result;
          } else {
            req.session.success = 'Importação bem sucedida.'
          }
          res.redirect('/times');
        });

        fs.unlinkSync(req.file.path);
      });


  });

  app.get('/times/exportar', restrict, function (req, res) {
    getTimes(function (err, times) {
      if (!err) {
        res.render('pages/timesExport', {
          times: times
        });
      } else {
        req.session.error = err;
        res.render('pages/timesExport', {
          times: [],
        });
      }
    });
  });

  app.post('/times/exportar', restrict, function (req, res) {
    const { time } = req.body;
    console.log('REQBODY', req.body);
    console.log('TIME REQBODY', time);
    exportJogadores(time, function (err, result) {
      //this statement tells the browser what type of data is supposed to download and force it to download
      res.writeHead(200, {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename=*jogadores*.csv'
      });
      // whereas this part is in charge of telling what data should be parsed and be downloaded
      res.end(result, "binary");
    });
  });

};