const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  mobile: String,
  department: String,
  year: String,
  username: String,
  password: String
});

module.exports = mongoose.model("User", UserSchema);