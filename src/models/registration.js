require('dotenv').config();
const api=process.env.SECRET_KEY;
const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const studentRegister=new mongoose.Schema({
    firstname:{
        type:String,
        require:true,
        trim:true,
    },
    middlename:{
        type:String,
        trim:true,
    },
    lastname:{
        type:String,
        require:true,
        trim:true,
    },
    course:{},
    gender:{},
    phone:{
        type:Number,
        require:true,
        unique:true
    },
    Current_Address:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    psw:{
        type:String,
        require:true,
    },
    psw_repeat:{
      type:String,
      require:true,  
    },
    tokens:[{
       token:{
           type:String,
           require:true,
       }
    }]

});
studentRegister.methods.generateAuthToken=async function(){
    try{
      const token=jwt.sign({_id:this._id.toString()},"hello_Hi_rishabh_giri_this_side_how_are_you");
      this.tokens=this.tokens.concat({token:token});
      await this.save();
      return token;
      //console.log(token);
    }catch(e){
       console.log(e);
    }
}
//password middleware
studentRegister.pre("save",async function(next){
   // console.log(`${this.psw}`);
    if(this.isModified("psw")){
        this.psw=await bcrypt.hash(this.psw,10);
        this.psw_repeat=undefined;
       // console.log(`${hashpassword}`);
        
    }
    next();
   // const hashpassword=await bcrypt.hash(psw,10);
   // next();
});
const NewRegister=new mongoose.model("NewRegister",studentRegister);
module.exports=NewRegister;