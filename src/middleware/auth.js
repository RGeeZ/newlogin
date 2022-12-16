const jwt=require("jsonwebtoken");
const Register=require("../models/registration");
require('dotenv').config();
const apiKey=process.env.SECRET_KEY;
const auth= async(req,res,next)=>{
   try{
      const token=req.cookies.jwt;
      const verifyToken=jwt.verify(token,"hello_Hi_rishabh_giri_this_side_how_are_you");
      console.log(verifyToken);
      const user=await Register.findOne({_id:verifyToken._id}); 
      console.log(user);
      next();
      req.token=token;
      req.user=user;
   }catch(error){
          res.send(error);
   }
};
module.exports = auth;