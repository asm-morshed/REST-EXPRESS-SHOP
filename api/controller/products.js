const mongoose = require('mongoose');
const Order = require('../models/order')
const Product = require('../models/product')


exports.get_all_products = (req, res, next) => {
    Product.find()
        .select('name price _id productImage')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        productImage: doc.productImage,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/products/' + doc._id
                        }
                    }
                })
            }

            res.status(200).json({
                response
            })


        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            })
        });
}
exports.products_create_product = (req, res, next) => {

    console.log(req.file);

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });
    product.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created Product Successfully',
                createdProduct: {
                    name: result.name,
                    price: result.price,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/' + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })

}
exports.product_get_product = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .select('name price _id productImage')
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json({
                    product: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products'
                    }
                })
            } else {
                res.status(404).json({
                    message: 'No valid entry found Provided ID'
                })
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });


}
exports.products_update_product = (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    // const updateOps = {
    //     name: req.body.name,
    //     price: req.body.price
    // };
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.update({ _id: id }, { $set: updateOps }).exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Product updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/products/' + id
                }
            })
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error
            })
        })
}

exports.products_delete_product = (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id })
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Product Deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/products',
                    data: { name: 'String', price: 'Number' }
                }
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: error })
        })
}