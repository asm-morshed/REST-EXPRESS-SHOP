const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const ProductController = require('../controller/products')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.minetype === 'image/png' || file.minetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({ storage: storage })

router.get('/', ProductController.get_all_products)


router.post('/', checkAuth, upload.single('productImage'), ProductController.products_create_product);

router.get('/:productId', ProductController.product_get_product);
router.patch('/:productId', checkAuth, ProductController.products_update_product)
router.delete('/:productId', checkAuth, ProductController.products_delete_product);

module.exports = router;