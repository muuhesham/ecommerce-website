const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/store");
    console.log("database connected");
  } catch (err) {
    console.log(err.message);
  }
};
module.exports = connectDB;
