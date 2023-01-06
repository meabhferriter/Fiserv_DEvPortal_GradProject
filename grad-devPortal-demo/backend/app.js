 const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const User = require("./models/user");
const userRoutes=require('./routes/user');

const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
///connect with mongoDB 
mongoose.Promise = global.Promise;
mongoose.set('strictQuery',true);
mongoose.connect('mongodb+srv://RMJ:RMJ_2022@cluster0.gmg6mgk.mongodb.net/users?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
  console.log('connected to the DB ');
 }).catch(()=>{
  console.log('connection failed' );
 });
///// check our midleware && CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
  });
 app.use("/user",userRoutes);
 
 
 
//  app.use('/api/signup',(req,res,next)=>{
//     console.log('First midleware');
//     next();
// });
// app.get('/api/users',(req,res,next)=>{
//     res.status(200).json({
//         message:'Succesfully ',
//         user:users
//     });

// });


// app.post("/api/signup",(req,res,next)=>{
//    let user=req.body;
//    user=user;
//    console.log(user);
//    res.status(201).json({
//     message:'user addd succsessfuly ',
//     users:user
//    });

   
    
// });

module.exports=app;