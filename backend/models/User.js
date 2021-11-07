const mongoose = require("mongoose");

//!USERS SCHEMA
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 6,
    max: 15,
    unique: true,
  },
  first_name: {
    type: String,
    required: true,
    min: 2,
    max: 100,
  },
  last_name: {
    type: String,
    required: true,
    min: 2,
    max: 100,
  },
  email: {
    type: String,
    required: true,
    min: 5,
    max: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 1024,
  },
  join_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
