const productModel = require("../Models/product.model");
const Category = require("../Models/category.model");

//TODO: ADMIN CAN DO THIS: CREATE PRODUCT / DELETE PRODUCT 
// USER WILL SHOW ONLY THE PRODUCTS

exports.createProduct = async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  try {
    req.body.img = req.file.filename;
    const { name, price, desc, img, category } = req.body;
    
    const existingCategory = await Category.findOne({ name: category });
    if (!existingCategory) {
      return res.status(400).json({ msg: "Category not found" });
    }
    
    const existingProduct = await productModel.findOne({ name });
    if (existingProduct) {
      return res.status(400).json({ msg: "Product already exists" });
    }
    
    const product = await productModel.create({
      name,
      price,
      desc,
      img: req.body.img,
      category: existingCategory._id,
    });
    
    res.status(201).json(product);
  } catch (err) {
    console.log(req.body);
    console.log(req.file);
    res.status(500).json({ msg: err.message });
  }
};


exports.getProducts = async (req, res) => {
  try {
    const products = await productModel
      .find({isdeleted:false , inStock:true}).populate("category", "name");

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });
    product.isdeleted = true;
    await product.save();
    res.status(200).json({ msg: "Product deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await productModel
      .findById(req.params.id)
      .populate("category");
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getProductByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const products = await productModel.find({ category, isdeleted: false })
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.searchProducts = async (req, res) => {
  try {
    const { name, price, category } = req.query;
    const query = {};

    if (name) {
      query.name = { $regex: name, $options: 'i' }; 
    }
    if (price) {
      query.price = { $lte: price }; 
    }
    if (category) {
      query.category = category;
    }

    const products = await productModel.find(query);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getTotalProducts = async (req, res) => {
  try {
    const count = await productModel.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};