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
        type:String
    },
    category:{
        type:Number
    },
    stock:{
        type:String
    },
    isPopular:{
        type: Boolean
    },
    isNew:{
        type: Boolean
    }
})

const Product = mongoose.model('Product',productSchema);

module.exports = Product;