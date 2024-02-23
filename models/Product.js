const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    description: {
        type: String
    },
    image:{
        type:String
    },
    price:{
        type:Number
    },
    category:{
        type:String
    },
    stock:{
        type:Number
    },
    isPopular:{
        type: Boolean
    },
    isNewItem:{
        type: Boolean
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Product = mongoose.model('Product',productSchema);

module.exports = Product;