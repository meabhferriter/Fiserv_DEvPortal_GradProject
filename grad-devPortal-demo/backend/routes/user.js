const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const checkAuth=require('../midleware/checkauth');
require("dotenv").config();
const User = require("../models/user");
// const ResetToken=require("../models/resettoken")
// const passport = require("passport");
const generat=require('generate-password');
// const { update } = require("../models/user");
// const { use } = require("passport");

// let counter=0;
// let users=User;

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
                    message : 'invalid registeration '
                });
              });
          }
        });
      }
    });
});
// //////////////////////////////////////////////////////////////////////////////////////////////////////

router.post("/login", (req, res, next) => {

  User.getAuthenticated(req.body.username, req.body.password, function(err, user, reason){
  if (err) {
    console.log('errrrrr',err);
    throw err;
  }
    // users=req.body;
    // console.log(users);

  // login was successful if we have a user
  if (user) {
      // handle login success
      console.log('login success',user);         
           const token=jwt.sign(
            {
              email: user.email,
              userId: user._id
          
            },"secret_this_should_be_longer",
            {expiresIn:"1h"}
           );
           console.log(user._id);
           //verify the token 
           checkAuth  
               res.status(200).json({
                message: "Auth successful",
                token:token  ,
                expiresIn:3600,
                userId:user._id,
                loginAttempts:reason
          });
          return;  
         }       
         ///
     switch (reason) {
          case reason.NOT_FOUND:break;
          case reason.PASSWORD_INCORRECT:
              // note: these cases are usually treated the same - don't tell
              // the user *why* the login failed, only that it did
              break;
          case reason.MAX_ATTEMPTS: 
              // send email or otherwise notify user that account is
              // temporarily locked
              break;
        }
  
        console.log('failed attempts case ',reason);

        return res.status(401).json({
          message: "Auth failed",
          loginAttempts:reason
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

// /////////////////////////////////////////////////////////

router.post("/reset",(req,res,next)=>{
  User.replaceOne
  User.findOne({username:req.body.username})
  .then(user=>{
    if (!user){
          res.status.json({
            message:"username not found ",
         })
      }
            
            console.log(user);
            const restpass=user._id;
            console.log(restpass);
            // const restToken=User.createPaass(user._id);
         const newq =generat.generate({
                      length:10,
                      lowercase:true,
                      uppercase:true,
                      number:true,
                    });
            console.log(newq);
            bnew=bcrypt.hash(newq, 10,(err,hash)=>
            {  
               if (err) {
              return res.status(500).json({
                error: err
              });
            } else {
                    const rehash=hash;
                    console.log(rehash);
                   }
                  
                  // console.log(checkAuth);
                  //  checkAuth
            });
          
                     
    })
  });
  
    
  
  
 

module.exports = router;