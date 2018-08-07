const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');
const authOrder = require('../middleware/check-auth');

const OrderController = require('../controller/orders')


//Handle incoming GET requests
router.get('/', authOrder, OrderController.order_getall);

router.post('/', authOrder, OrderController.order_create);

router.get('/:orderId', authOrder, OrderController.orders_get_order);

router.delete('/:orderId', authOrder, OrderController.orders_delete_order);

module.exports = router;