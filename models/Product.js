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
    }
})

const Product = mongoose.model('Product',productSchema);

module.exports = Product;