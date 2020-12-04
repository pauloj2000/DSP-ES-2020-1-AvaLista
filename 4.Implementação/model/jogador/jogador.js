const pool = require('../db/connection');

module.exports = {
  cadastrarJogador: function (time, nome, dataNascimento, score, callback) {
    pool.query('INSERT INTO jogadores (nome, nascimento, score) VALUES ($1, $2, $3) returning *', [nome, dataNascimento, score], (err, res) => {
      console.log(err);
      console.log('Result query', res.rows);
      if (err) {
        console.log(err);
        callback(true, 'Erro ao realizar importação.');
      } else {
        const idJogador = res.rows[0].id;
        pool.query('INSERT INTO jogadores_times (jogador_id, time_id) VALUES ($1, $2) returning *', [idJogador, time], (err, res) => {
          if (err) {
            console.log(err);
            callback(true, 'Erro ao realizar importação.');
          } else {
            callback(false, res.rows);
          }
        });
      }
    });
  }
};
