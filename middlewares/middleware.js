const  User = require("../models/User");
const jwt = require('jsonwebtoken')

const isAlreadyRegistered = async (req,res,next)=>{
    try {
        const {email} = req.body;
    const user = await User.find({email});
    if(user.length === 0){
        return next();
    }
    return res.status(300).send({msg: "Email Already Registered please Login Or Reset Your Password"})
    } catch (error) {
        console.log(error)
        return res.status(500).send({msg: "Internal Server Error While Checking User Existence"})
    }
}

const isAuthenticatedUser = async(req,res,next)=>{
    try {
        const {authorization} = req.headers;
        console.log(req.headers)
        console.log(authorization)
        
        if(authorization){
            return next();
        }
        else{
            return res.status(400).send({msg: "Please Login Again"});
        } 
    } catch (error) {
        return res.status(500).send({msg: "Internal Server Error While Checking User Authentication"})
    }
}

module.exports = {isAlreadyRegistered,isAuthenticatedUser}