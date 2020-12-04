
const MongoClient = require('mongodb').MongoClient;
const uri = process.env.DB_NOSQL_URL;
const client = new MongoClient(uri, { useNewUrlParser: true });

module.exports = client;