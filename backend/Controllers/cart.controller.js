const Cart = require("../Models/cart.model");
const Product = require("../Models/product.model");

exports.addToCart = async (req, res) => {

  console.log("Received productId:", req.body.productId);
  console.log("Received quantity:", req.body.quantity);
  console.log("Received size:", req.body.size);
  try {
    const { userId, productId, quantity, size } = req.body;
      
    if (quantity < 1 || quantity > 10) {
      return res
        .status(400)
        .json({ message: "Quantity must be between 1 and 10" });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (!product.size.includes(size)) {
      return res.status(400).json({ message: "Invalid size" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ items: [], totalPrice: 0 });
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId && item.size === size
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        productId,
        name: product.name,
        size,
        quantity,
        price: product.price,
      });
    }

    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.log("Received productId:", req.body.productId);
    console.log("Received quantity:", req.body.quantity);
    console.log("Received size:", req.body.size);
    console.error(error);
    res.status(500).json({ message: "Error adding to cart", error });

  }
};


exports.removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (!existingItem)
      return res.status(404).json({ message: "Item not found in cart" });

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error removing item from cart", error });
  }
};



exports.clearCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = []; 
    cart.totalPrice = 0; 
    await cart.save();

    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ message: "Error clearing cart", error });
  }
};

exports.getCart = async (req, res) => {
  try {
    const userId = req.params.id;
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
};
