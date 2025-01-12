const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
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
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Cancelled"],
      default: "Pending",
    },
    orderDate: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

orderSchema.pre("save", function (next) {
  this.totalPrice = this.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  next();
});

module.exports = mongoose.model("order", orderSchema);
