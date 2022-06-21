const mongoose = require("mongoose");

exports.connUser = (connUser) => {
  const userSchema = new mongoose.Schema({
    nick_name: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    token: { type: String },
  });
  
  return connUser.model("user", userSchema);
}

