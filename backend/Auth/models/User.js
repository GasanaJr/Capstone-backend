const mongoose = require('mongoose');
const { use } = require('../routes/auth');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    // phone: {
    //     type: String,
    //     min: 10,
    //     required: true
    // },
    Image: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User =  mongoose.model('User', userSchema);