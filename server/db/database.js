/**
 *  database.js: a mongoose instance that connects to the local MongoDB instance
 */
const mongoose = require('mongoose');

let host = process.env.DB_HOST || 'localhost';
let port = process.env.DB_PORT || '27017';

const server = `${host}:${port}`;
const database = process.env.DB_INITDB || 'admin';

  module.exports = function init_connection(callback) {
    mongoose.connect(`mongodb://${server}/${database}`, { useNewUrlParser: true});
    var db = mongoose.connection;
    db.on('error', function (err) {
      console.error('MongoDB connection failed.');
      console.log(err);
      process.exit(1);
    });
  
    db.once('open', function () {
      console.log("MongoDB connection successful.");
      callback();
    });
  };