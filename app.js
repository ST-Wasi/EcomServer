const express = require('express');
const app = express();
const dotenv  = require('dotenv').config();
const mongoose = require('mongoose');
const userRoutes = require('./apis/user')
const productRoutes = require('./apis/product')
const session = require('express-session')
const cors = require('cors');

app.use(cors({
    origin: ["http://localhost:5173","https://react-ecom-fe-iota.vercel.app"]
  }))
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        httpOnly: true,
        // maxAge: Date.now() * 60 *60*24*7;
    }
  }))

mongoose.connect(process.env.DB_URL)
.then(()=>{
    console.log(`Database Connected`)
    app.listen(process.env.PORT,()=>{
        console.log(`server started at http://localhost:${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log('error occured while connecting to Database')
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(userRoutes)
app.use(productRoutes)

