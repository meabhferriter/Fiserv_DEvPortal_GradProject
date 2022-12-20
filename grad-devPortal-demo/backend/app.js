const express=require('express');
const app=express();
const bodyParser=require("body-parser");



const users=[{
    
    "username": "rmj",
    "first_name": "redha",
    "last_name": "Abbood ",
    "role": "user",
    "email": "r@gmail.com",
    "password": "111111",
    "id": 1
}, 
{
    "username": "XX_76",
    "first_name": "xy",
    "last_name": "y",
    "role": "Manger",
    "email": "x@gmail.com",
    "password": "333333",
    "id": 3
},{
    "username": "pj",
      "first_name": "pj",
      "last_name": "oconall",
      "role": "Qa",
      "email": "pj@gmail.com",
      "password": "222222",
      "id": 2
}
]
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
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:false}));

app.use('/api/signup',(req,res,next)=>{
    console.log('First midleware');
    next();
});
app.get('/api/users',(req,res,next)=>{
    res.status(200).json({
        message:'Succesfully ',
        user:users
    });

});


app.post("/api/signup",(req,res,next)=>{
   let user=req.body;
   user=users;
   console.log(user);
   res.status(201).json({
    message:'user addd succsessfuly ',
    users:user
   });

   
    
});

module.exports=app;