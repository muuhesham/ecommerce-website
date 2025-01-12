const express = require("express");
const router = express.Router();
const productController = require("../Controllers/product.controller");
const { body, validationResult } = require("express-validator");
const upload = require('../Config/multer.config');
const {isAdmin, authMW} = require('../Util/auth');

router.post(
  "/addproduct",
  upload.single("img"),
  authMW , isAdmin,
  [
    body("name").notEmpty().withMessage("Product name is required"),
    body("desc").notEmpty().withMessage("Description is required"),
    body("category").notEmpty().withMessage("Category is required"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  productController.createProduct
);
router.get("/allproducts",productController.getProducts);
router.delete("/removeproduct/:id", authMW , isAdmin,productController.deleteProduct);
router.get("/product/:id", productController.getProductById)
router.get("/searchproducts", productController.searchProducts);
router.get("/categories/:category", productController.getProductByCategory);
router.get("/count", productController.getTotalProducts);

module.exports = router;
