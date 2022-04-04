const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
    name: String,
    email: String,
    password: String,
    avatar_image: {
        type: String,
        default: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
    },
    rol: {
        type: String,
        default: 'worker'
    },
    created_at: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('User', User);