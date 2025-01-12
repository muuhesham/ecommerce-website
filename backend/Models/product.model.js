const mongoose = require("mongoose");


const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true , min:0 },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    isdeleted: { type: Boolean, default: false },
    inStock: { type: Boolean, default: true },
    quantity: { type: Number, default: 10, min:1 , max:10 },
    size: { type: String, enum: ["small", "medium", "large"] , default: "medium" },
  },
  {
    timestamps: true,
  }
);



const Product =
  mongoose.models.product || mongoose.model("product", productSchema);

module.exports = Product;
