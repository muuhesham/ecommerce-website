const mongoose = require('mongoose');


const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    // mobile: { type: String },
    // address: { type: String },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model('user', userSchema);