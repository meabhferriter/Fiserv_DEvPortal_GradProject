const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const checkAuth=require('../midleware/checkauth');
require("dotenv").config();
const User = require("../models/user");
const ResetToken=require("../models/resettoken")
const passport = require("passport");
const generat=require('generate-password');
const { update } = require("../models/user");

let counter=0;
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


          // user.save().then(error)=>{



          // }).then {
          //     if (error) {
          //       callback({error: true});
          //       res.status(500).json({
          //                   error: error
          //               });
          //     } else {
          //       callback({success: true});
          //       res.status(201).json({
          //               message: "User created"
          //             });
          //     }
          // //   }).then(result => {
          // //     console.log(result);
          // //       res.status(201).json({
          // //       message: "User created"
          // //     });
          // //   }).catch(err => {
          // //     console.log(err);
          // //      res.status(500).json({
          // //       error: err
          // //   });
          // });
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
// //////////////////////////////////////////////////////////////////////////////////////////////////////

router.post("/login", (req, res, next) => {
  // console.log(req.body);
//  let users={};
User.getAuthenticated(req.body.username, req.body.password, function(err, user, reason){
  if (err) {
    console.log('errrrrr',err);
    throw err;}
let users=req.body;
console.log(users);

  // login was successful if we have a user
  if (user) {
      // handle login success
      console.log('login success',user);
      console.log('login fail', counter);
            
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
          // console.log('role',role);
              res.status(200).json({
                message: "Auth successful",
                token:token  ,
                expiresIn:3600,
                userId:user._id,
                // merchant:role,
                loginAttempts:user.loginAttempts
          });
          return;  
         }       
  // }
  console.log('reson',reason,user);
  
  switch (reason) {
     case reason.NOT_FOUND:break;
     case reason.PASSWORD_INCORRECT:
          // console.log('reasons.PASSWORD_INCORRECT',reason.PASSWORD_INCORRECT);
          
        // note: these cases are usually treated the same - don't tell
        // the user *why* the login failed, only that it did
        break;
    case reason.MAX_ATTEMPTS: console.log('reasons.PASSWORD_INCORRECT',reason.MAX_ATTEMPTS);
        // send email or otherwise notify user that account is
        // temporarily locked
        break;
  }
  return res.status(401).json({
    message: "Auth failed",
    // userId:users._id,
    loginAttempts:reason
  }); 
// return reason;
});
// .then(result=>{
//          if(!result){}
   
//        else{
//            console.log('login fail', counter);
            
//            const token=jwt.sign(
//             {
//               email: User.email,
//               userId: User._id
          
//             },"secret_this_should_be_longer",
//             {expiresIn:"1h"}
//            );
//            console.log(users._id);
//            //verify the token 
//            checkAuth
          
          
//           console.log('role',role);
//               res.status(200).json({
//                 message: "Auth successful",
//                 token:token  ,
//                 expiresIn:3600,
//                 userId:users._id,
//                 merchant:role,
//                 loginAttempts:counter
//                       });}
//           }).catch(err => {
//                console.log(err);
//                res.status(500).json({
//                  message: "Invallid auth credentials",
//                  userId:users._id
//           });
//         });
// //         });
//       });
//     }     
// });

  // User.findOne({ username:req.body.username})
  //     .then(user => {
  //         users=user;
  //         role=users.merchant,
  //         console.log('find the username',user,role);
  //        if(!user){
  //           return res.status(401)
  //                 .json({
  //                    message:'ssssssssss',
  //                    userId:users._id,
  //                   // loginAttempts:++counter
  //                 });
  //          }
  //             const isvaild= user.comparePassword(req.body.password);
           
  //             return isvaild
  //               //  req.session.userId=users._id;
  //               //  req.session.message.push({
  //               //   text:"ssss",
  //               //   type:'success'
  //               // });
  //               // return res.redirect('/userDashboard')
          
  //       //  const bycr=bcrypt.compare(req.body.password, user.password);
  //       //  return user.getAuthenticated(req.req.body.password)
  // //  return bycr;
         
  //           // return users.comparePassword(req.body.password,user.password);
  //        })
  //        .then(result =>{
  //         // counter= users.loginAttempts
  //         //  const counter=0
  //         if(!result){
  //           // ++counter;
  //           // var reasons = User.failedLogin;
  //           // console.log(reasons);
            
           
          
  //           console.log('login fail', counter);

  //           return res.status(401).json({
  //             message: "Auth failed",
  //             userId:users._id,
  //             // loginAttempts:
  //           }           
  //           );
           
  //     }//end if 
          
           
  //          else{
  //          console.log('login fail', counter);
            
  //          const token=jwt.sign(
  //           {
  //             email: User.email,
  //             userId: User._id
          
  //           },"secret_this_should_be_longer",
  //           {expiresIn:"1h"}
  //          );
  //          console.log(users._id);
  //          //verify the token 
  //          checkAuth
          
          
  //         console.log('role',role);
  //             res.status(200).json({
  //               message: "Auth successful",
  //               token:token  ,
  //               expiresIn:3600,
  //               userId:users._id,
  //               merchant:role,
  //               loginAttempts:counter
  //                     });}
  //         }).catch(err => {
  //              console.log(err);
  //              res.status(500).json({
  //                message: "Invallid auth credentials",
  //                userId:users._id
  //         });

  //       });
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