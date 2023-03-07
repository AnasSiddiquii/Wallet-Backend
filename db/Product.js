const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    photo: {
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