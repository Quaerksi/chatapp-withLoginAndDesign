const mongoose = require("mongoose");

const { MONGO_URI_USER } = process.env;

exports.connect = () => {
  // Connecting to the database
  var conn = mongoose.createConnection(MONGO_URI_USER);
  return conn;
  // mongoose
  //   .connect(MONGO_URI_USER, {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //   })
  //   .then(() => {
  //     console.log("Successfully connected to database");
  //   })
  //   .catch((error) => {
  //     console.log("database connection failed. exiting now...");
  //     console.error(error);
  //     process.exit(1);
  //   });
};
