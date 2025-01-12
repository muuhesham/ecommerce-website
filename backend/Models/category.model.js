const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true , enum:["men","women"], unique: true},
  // description: { type: String },
});
module.exports = mongoose.model("category", categorySchema);

