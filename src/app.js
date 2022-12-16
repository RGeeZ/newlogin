require('dotenv').config();
const express=require("express");
const app=express();
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const path=require("path");
const port=process.env.PORT || 3000;
const cookieparser=require("cookie-parser");
const auth=require("./middleware/auth");
require("./db/conn");
app.use(cookieparser());
//console.log(process.env);
const NewRegister=require("../src/models/registration");
//const static=path.join(__dirname,"../public");
console.log(__dirname);
app.use(express.static(path.join(__dirname,"../public")));
 app.set('views', path.join(__dirname, '../views'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set('view engine','hbs');
//console.log(process.env.SECRET_KEY);
app.get("/",async(req,res)=>{
  res.render('new');
});

app.get("/register",async(req,res)=>{
  res.send("Hi How are you");
});
app.post("/register",async(req,res)=>{
  try{
    const password_1=req.body.psw;
    const password_2=req.body.psw_repeat;
    if(password_1===password_2){
         const register=  NewRegister({
             firstname:req.body.firstname,
             middlename:req.body.middlename,
             lastname:req.body.lastname,
             phone:req.body.phone,
             email:req.body.email,
             psw:password_1,
             psw_repeat:password_2,
         })
         //generatr token 
         const token=await register.generateAuthToken();
         res.cookie("jwt",token,{
           expires:new Date(Date.now()+30000),
           httpOnly:true,
           secure:true,
         });
         // console.log(token);
         const registered=await register.save();
         res.status(201).render('new');
    }else{
      res.send("Password not matching");
    }
  }catch(error){
     res.status(400).send(error);
  }
});
app.get("/log",async(req,res)=>{
    res.render('login');
});
app.post("/log",async(req,res)=>{
 try{
   const email=req.body.email;
   const password=req.body.psw;
   const usermail =await NewRegister.findOne({email:email});
   const token=await usermail.generateAuthToken();
   console.log(token);
   res.cookie("jwt",token,{
    expires:new Date(Date.now()+30000),
    httpOnly:true,
    secure:true,
  });
   const ismatched=await bcrypt.compare(password,usermail.psw);
   //console.log(email);
   //if(usermail.psw===password){
   if(ismatched){
      res.status(201).render('login');
   }
   else{
     res.send("password no");
   }
   //res.send(usermail);

 } catch(error){
    res.status(400).send("Envalid Email");
 }
});
app.get("/secret",auth,async(req,res)=>{
  console.log(`${req.cookies.jwt}`);
    res.render('secret');
});
app.get("/logout",auth,async (req,res)=>{
  try{
    res.clearCookie("jwt");
    req.user.token=req.user.tokens.filter((currentelement)=>{
     return currentelement.clearElement.token !=req.element
    });
       console.log("log-out");
       await req.user.save();
  } catch(error){
    res.status(500).send(error);
  }
});
app.listen(port,(req,res)=>{
    console.log(`${port}`);
}); 