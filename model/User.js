const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 255,
  },
  email: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 255,
  },
  password: {
    type: String,
    required: true,
    maxLength: 1024,
    minLength: 6,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
