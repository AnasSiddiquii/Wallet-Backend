const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('products',productSchema)