const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Product = new Schema({
    name: String,
    stock: Number,
});

module.exports = mongoose.model('Product', Product);