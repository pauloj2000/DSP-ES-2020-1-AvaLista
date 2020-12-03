const pool = require('../db/connection');
const format = require('pg-format');

module.exports = {
  getTimes: function (callback) {
    pool.query('SELECT * from times', (err, res) => {
      if (err || res.rows.length == 0) {
        console.log(err);
        callback(true, 'Nenhum time encontrado');
      } else {
        callback(false, res.rows);
      }
    });
  },

  importJogadores: function (jogadores, callback) {
    pool.query(format('INSERT INTO jogadores (nome) VALUES %L', jogadores), [], (err, res) => {
      console.log(err);
      console.log(result);
    
    
      
    
    
    });

    


  }
};