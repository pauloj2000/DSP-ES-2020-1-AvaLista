const pool = require('../db/connection');
const format = require('pg-format');

module.exports = {
  getTimes: function (callback) {
    pool.query(`SELECT times.id, times.nome, SUM(j.score) as score
      FROM times
      LEFT JOIN jogadores_times jt ON jt.time_id = times.id
      LEFT JOIN jogadores j ON jt.jogador_id = j.id
      GROUP BY times.id
    `, (err, res) => {
      if (err || res.rows.length == 0) {
        console.log(err);
        callback(true, 'Nenhum time encontrado');
      } else {
        callback(false, res.rows);
      }
    });
  },

  importJogadores: function (time, jogadores, callback) {
    const arrayNomesJogadores = jogadores.map(jogador => [jogador.nome]);

    pool.query(format('INSERT INTO jogadores (nome) VALUES %L returning *', arrayNomesJogadores), [], (err, res) => {
      console.log(err);
      console.log('Result query', res.rows);
      if (err) {
        console.log(err);
        callback(true, 'Erro ao realizar importação.');
      } else {
        const arrayIdsJogadores = res.rows.map(jogador => [jogador.id, time]);
        pool.query(format('INSERT INTO jogadores_times (jogador_id, time_id)  VALUES %L', arrayIdsJogadores), [], (err, res) => {
          if (err) {
            console.log(err);
            callback(true, 'Erro ao realizar importação.');
          } else {
            callback(false, res.rows);
          }
        });
      }
    });
  },
  exportJogadores: function (time, callback) {
    console.log(time);
    pool.query(`
      SELECT jogadores.nome
      FROM jogadores
      INNER JOIN jogadores_times ON jogadores_times.jogador_id = jogadores.id
      WHERE jogadores_times.time_id = $1
    `, [time], (err, res) => {
      console.log('Err, res export:', err, res.rows);

      callback(false, dataToCSV(res.rows, ["nome"]));
    });
  }
};

// The function gets a list of objects ('dataList' arg), each one would be a single row in the future-to-be CSV file
// The headers to the columns would be sent in an array ('headers' args). It is taken as the second arg
function dataToCSV(dataList, headers) {
  var allObjects = [];
  // Pushing the headers, as the first arr in the 2-dimensional array 'allObjects' would be the first row
  allObjects.push(headers);

  //Now iterating through the list and build up an array that contains the data of every object in the list, in the same order of the headers
  dataList.forEach(function (object) {
    var arr = [];
    arr.push(object.nome);
    // Adding the array as additional element to the 2-dimensional array. It will evantually be converted to a single row
    allObjects.push(arr)
  });

  // Initializing the output in a new variable 'csvContent'
  var csvContent = "";

  // The code below takes two-dimensional array and converts it to be strctured as CSV
  // *** It can be taken apart from the function, if all you need is to convert an array to CSV
  allObjects.forEach(function (infoArray, index) {
    var dataString = infoArray.join(",");
    csvContent += index < allObjects.length ? dataString + "\n" : dataString;
  });

  // Returning the CSV output
  return csvContent;
}