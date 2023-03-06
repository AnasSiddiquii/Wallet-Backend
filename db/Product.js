const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    photo: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    offer: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('products',productSchema)