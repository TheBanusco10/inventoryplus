const express = require('express');
const router = express.Router();

const productModel = require('../mongodb/schemas/Product');

router.get('/products', async (req, res) => {
    const data = await productModel.find();

    res.send(data);
});

router.post('/products/new-product', async (req, res) => {

    try {
        const name = req.body.name;
        const stock = req.body.stock;

        const product = new productModel({
            name,
            stock
        });
    
        const newProduct = await product.save();
        res.send(newProduct);
    
    }catch(error) {
        console.error(error);
    }
    

});

router.put('/products/edit-product/:id', async (req, res) => {

    try {
        const id = req.params.id;

        const newProduct = req.body;
        const productUpdated = await productModel.findOneAndUpdate({_id: id}, newProduct, {new: true});
    
        res.send(productUpdated);
    
    }catch(error) {
        console.error(error);
    }
    

});

router.delete('/products/remove-product/:id', async (req, res) => {

    try {
        const id = req.params.id;

        const productRemoved = await productModel.findOneAndDelete({_id: id}, {new: true});
    
        res.send(productRemoved);
    
    }catch(error) {
        console.error(error);
    }
    

});

module.exports = router;