const express = require('express');
const Product = require('../models/Product');
const router = express.Router();
const { loggedIn } = require('../middlewares/middleware');




router.post('/products',loggedIn,async (req,res)=>{
    try {
        const {name,description,image,price,category,stock,isPopular,isNewItem} = req.body;
        if(name && description && image && price && category && stock){
            await Product.create({name,description,image,price,category,stock,isPopular,isNewItem});
            return res.status(201).send({msg: "Product Added Sucesfully"})
        } else{
            return res.status(500).send({msg: "Some Fields Are Missing"})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({msg: "INternal Server Error Occured WHile Adding New Product",error})
    }
})
router.get('/products',loggedIn, async(req,res)=>{
    try {
        const products = await Product.find({});
        return res.status(200).send(products)
    } catch (error) {
        return res.status(500).send("Internal server error occured while getting products")
    }
})
module.exports = router;