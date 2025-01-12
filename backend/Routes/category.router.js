const express = require('express');
const router = express.Router();
const categoryController = require('../Controllers/category.controller');
const {isAdmin, authMW} = require('../Util/auth');


router.post('/addcategory', authMW , isAdmin,categoryController.createCategory);
router.delete('/removecategory/:id', authMW , isAdmin,categoryController.deleteCategory);
router.get('/getcategories',categoryController.getCategories);

module.exports = router;