const express = require('express');
const Product = require('../models/Product');
const { loggedIn } = require('../middlewares/middleware');
const router = express.Router();

router.get('/products',loggedIn, async(req,res)=>{
    // route will be updated soon for now just created a mock route
    const products = await Product.find({});
    return res.status(200).send(products)
})

module.exports = router;