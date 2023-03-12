const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    cphoto: {
        type: String,
        required: true
    },
    fphoto: {
        type: String,
        required: true
    },
    bphoto: {
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
    },
    description: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('products',productSchema)