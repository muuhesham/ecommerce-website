const Cart = require("../Models/cart.model");
const Order = require("../Models/orderProduct.model");

exports.placeOrder = async (req, res) => {
  try {
    const { userId } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart || cart.items.length === 0) {
      return res
        .status(400)
        .json({ message: "No items in the cart to place order" });
    }

    const order = new Order({
      userId,
      items: cart.items,
      totalPrice: cart.totalPrice,
      status: "Pending",
      orderDate: Date.now(),
    });

    await order.save();
    
    await Cart.deleteOne({ userId });

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error placing order", error });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!["Accepted", "Cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    // add more messages
    if (status === "Accepted") {
      return res.status(200).json({
        message: "Order Accepted successfully. Payment on delivery.",
      });
    } else if (status === "Cancelled") {
      return res.status(200).json({
        message: "Your order has been cancelled.",
      });
    }

    res.status(200).json({ message: `Order status updated to ${status}` });
  } catch (error) {
    res.status(500).json({ message: "Error updating order status", error });
  }
};