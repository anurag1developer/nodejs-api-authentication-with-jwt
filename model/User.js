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
    unique: true,
  },
  password: {
    type: String,
    required: true,
    maxLength: 1024,
    minLength: 6,
  },
  contact1: {
    type: Number,
    required: true,
    unique: true,
  },
  contact2: {
    type: Number,
    unique: true,
  },
  contact3: {
    type: Number,
    unique: true,
  },
  tokens: {
    type: Array,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
