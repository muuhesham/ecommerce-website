const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, 
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" }, 
        name: { type: String, required: true }, 
        size: { type: String, required: true }, 
        quantity: { type: Number, default: 1, required: true }, 
        price: { type: Number, required: true }, 
      },
    ],
    totalPrice: { type: Number, default: 0 }, 
  },{
    versionkey: false,
  },
 );

cartSchema.pre("save", function (next) {
  this.totalPrice = this.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  next();
});

module.exports = mongoose.models.Cart || mongoose.model("Cart", cartSchema);
