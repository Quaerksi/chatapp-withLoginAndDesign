const mongoose = require("mongoose");

const { MONGO_URI_USER } = process.env;

exports.connect = () => {
  // Connecting to the database
  var conn = mongoose.createConnection(MONGO_URI_USER);
  return conn;
};

