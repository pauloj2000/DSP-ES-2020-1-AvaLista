'use strict';

const { getTimes } = require('../model/times/times');


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
    console.log('route import');
    getTimes(function (err, times) {
      if (!err) {
        res.render('pages/timesImprot', {
          times: times
        });
      } else {
        req.session.error = err;
        res.render('pages/timesImprot', {
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
        importJogadores(row);
      })
      .on('end', () => {
        console.log('CSV file successfully processed');
        fs.unlinkSync(req.file.path);
      });


    // csv.fromPath(req.file.path)
    //   .on("data", function (data) {
    //     fileRows.push(data); // push each row
    //   })
    //   .on("end", function () {
    //     console.log(fileRows) //contains array of arrays. Each inner array represents row of the csv file, with each element of it a column
    //     fs.unlinkSync(req.file.path);   // remove temp file
    //     //process "fileRows" and respond
    //   });

    console.log(time, fileRows);
  });

};