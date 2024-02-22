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
        return res.status(500).send({msg: "Internal Server Error Occured WHile Adding New Product",error})
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

router.get('/product/:id',loggedIn,async (req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        if(product){
            return res.status(200).send(product);
        }
        return res.status(400).send("Product Not Found");
    } catch (error) {
        return res.status(500).send("Internal server Error While Finding The Particular Product")
    }
})

router.put('/product/:id/edit',async (req,res)=>{
    try {
        const {id} = req.params;
    const {name,description,image,price,category,stock,isPopular,isNewItem} = req.body;
    await Product.findByIdAndUpdate(id,{name,description,image,price,category,stock,isPopular,isNewItem})
    return res.status(201).send("Product Updated Sucesfuly")
    } catch (error) {
        return res.status(500).send("Internal Server Error Occured While Updating The Product")
    }
    
})
module.exports = router;