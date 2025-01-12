const express = require('express');
const router = express.Router();
const orderController = require('../Controllers/order.controller');
const { authMW , isAdmin } = require("../Util/auth"); 


router.post('/placeorder', authMW,orderController.placeOrder);
router.post("/updatestatus", authMW, isAdmin, orderController.updateOrderStatus);


module.exports = router;