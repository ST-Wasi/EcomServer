const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcrypt')
const {isAlreadyRegistered,isAuthenticatedUser} = require('../middlewares/middleware')
const jwt = require('jsonwebtoken')

router.post('/signup',isAlreadyRegistered, async (req,res)=>{
    try {
        const {name,email,role,password} = req.body;
        if(email && password && role){
            const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS) ).then(function(hash) {
                return hash;
            });
            await User.create({name,email,role,password:hashedPassword})
            return res.status(201).send({msg: "User Created Sucesfully"})
        }
       return res.status(400).send({msg: "Some Inputs are Not Provided"});
    } catch (err) {
        return res.status(500).send({msg: "Internal Server Error Faced While Signup"});
    }
})

router.post('/login', async(req,res)=>{
    try {
        const {email,password} =req.body;
        const user = await User.findOne({email});
        if(user){
            const isValidUser = await bcrypt.compare(password,user.password);
            if(isValidUser){
                const token = jwt.sign({id: user._id,email:user.email},process.env.SECRET_KEY)
                req.session.token = token
                return res.status(200).send({token:token,msg:"Succesfully Loggedin",user:user})
            } else{
                return res.status(400).send({msg: "Invalid Password"})
            }
        } else{
            return res.status(400).send({msg: "Email Not Registered. Please Register"})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({msg: "Error Occcored",err: error})
    }
    
})

module.exports = router;