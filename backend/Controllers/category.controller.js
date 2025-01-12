const Category = require("../Models/category.model");



exports.createCategory = async (req, res) => {
  const { name} = req.body;

  try {
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ msg: "Category already exists" });
    }
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }

    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}