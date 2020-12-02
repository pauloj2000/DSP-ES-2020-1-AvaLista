const pool = require('../db/connection');
const bcrypt = require('bcrypt');

module.exports = function (email, password, callback) {
  pool.query('SELECT * from usuarios WHERE email=$1', [email], (err, res) => {
    if (err || res.rows.length == 0) {
      callback(true, 'Usuário não encontrado');
    } else {
      const compareResult = bcrypt.compareSync(password, res.rows[0].password);
      if (compareResult) {
        delete res.rows[0].password;
        callback(false, res.rows[0]);
      } else {
        callback(true, 'Senha Incorreta.');
      };
    }
    // pool.end();
  });

}