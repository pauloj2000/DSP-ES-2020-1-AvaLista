
const client = require('../db/nosql/connection');

module.exports = {
  getUsuarios: function (callback) {

    client.connect(err => {
      const collection = client.db("torneiros").collection("usuarios");
      console.log(collection);
      // perform actions on the collection object
      client.close();
    });


    callback(true, 'Nenhum usuario encontrado');

    // if (err || res.rows.length == 0) {
    //   console.log(err);
    //   callback(true, 'Nenhum time encontrado');
    // } else {
    //   callback(false, res.rows);
    // }
  }
}

