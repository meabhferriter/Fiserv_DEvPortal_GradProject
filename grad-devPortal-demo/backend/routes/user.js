const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const checkAuth=require('../midleware/checkauth');
require("dotenv").config();

const User = require("../models/user");
// these values can be whatever you want - we're defaulting to a
    // max of 5 attempts, resulting in a 2 hour lock
    MAX_LOGIN_ATTEMPTS = 5,
    LOCK_TIME = 2 * 60 * 60 * 1000;


router.post("/signup", (req, res, next) => {

  User.find({ email: req.body.email})
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            console.log(req.body.firstName,req.body.lastName);
            
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              username:req.body.username,
              firstName:req.body.firstName,
              lastName:req.body.lastName,
              merchant:req.body.merchant,
              company:req.body.company,
              jobTitle:req.body.jobTitle,
            });
            user.save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "User created"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
});

router.post("/login", (req, res, next) => {
  // console.log(req.body);
 let users={};
  User.findOne({ username:req.body.username})
      .then(user => {
          users=user;

         console.log('find the username',user);
         if(!user){
            return res.status(401)
                  .json({
                  message: "Auth failed",
                  userId:users._id
                     });
           }
      
         const bycr=bcrypt.compare(req.body.password, user.password);
        //  return user.getAuthenticated(req.req.body.password)
   return bycr;
       
      
         })
         .then(result =>{
          console.log(result);
           
          if(!result){
            return res.status(401).json({
              message: "Auth failed",
              userId:users._id
            });
           }
           const token=jwt.sign(
            {
              email: User.email,
              userId: User._id
          
            },"secret_this_should_be_longer",
            {expiresIn:"1h"}
           );
           console.log(users._id);
           //verify the token 
           checkAuth
            res.status(200).json({
                message: "Auth successful",
                token:token  ,
                expiresIn:3600,
                userId:users._id
                      });
          }).catch(err => {
              console.log(err);
              res.status(500).json({
                message: err,
                userId:users._id
          });

        });
      });
        // .....................................

router.delete("/:userId", (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
        
      });
    });
});

module.exports = router;