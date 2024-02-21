const express = require('express');
const Product = require('../models/Product');
const { loggedIn } = require('../middlewares/middleware');
const router = express.Router();

router.get('/products',loggedIn, async(req,res)=>{
    try {
        const products = await Product.find({});
        return res.status(200).send(products)
    } catch (error) {
        return res.status(500).send("Internal server error occured while getting products")
    }
})

router.post('/products',loggedIn,async (req,res)=>{
    try {
        const {name,description,image,price,category,stock,isPopular,isNew} = req.body;
        if(name && description && image && category && stock && isPopular && isNew){
            await Product.create({name,description,image,price,category,stock,isPopular,isNew});
            return res.status(201).send({msg: "Product Added Sucesfully"})
        } else{
            return res.status(500).send({msg: "Some Fields Are Missing"})
        }
    } catch (error) {
        return res.status(500).send({msg: "INternal Server Error Occured WHile Adding New Product"})
    }
})

module.exports = router;