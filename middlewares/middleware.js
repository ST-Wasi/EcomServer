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

const loggedIn = async (req, res, next) => {
    let token = req.headers.authorization; 
    try {
      if (token) {
         token = req.headers.authorization.split(" ")[1];
        if (token) {
          const payload = jwt.verify(token, process.env.SECRET_KEY);
          if (payload) {
            req.user = payload;
            next();
          } else {
            res.status(400).json({ error: "token verification failed" });
          }
        } else {
          res.status(400).json({ error: "malformed auth header" });
        }
      } else {
        res.status(400).json({ error: "No authorization header" });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  };

  const isSeller = async (req,res,next)=>{
    try {
      const {email} = req.user;
    const user = await User.find({email})
    if(user.length > 0){
      if(user[0].role === 'seller'){
        next();
      } else{
        return res.status(400).send("Not Authorized")
      }
    } else{
      return res.status(400).send("USer not Found");
    }
    } catch (error) {
      return res.status(500).send("Internal Server Errr Faced While Checking Seller Authorization")
    }
    
  }

module.exports = {isAlreadyRegistered,loggedIn,isSeller}