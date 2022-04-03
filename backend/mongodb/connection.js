const mongoose = require('mongoose');

const connectMongoDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/inventoryplus');
        console.log('Mongo connected');
    }catch(error) {
        console.error(error);
    }
}

module.exports = connectMongoDB;
