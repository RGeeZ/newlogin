/*const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:2707/login_log",{
   // UseNewUrlParese:true,
   // UseUnifiedTopology:true,
    //UseCreateIndex:true,
}).then(()=>{
    console.log("Connected");
}).catch((e)=>{
    console.log(e);
});*/
const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/login_log",{
    useNewUrlParser:true,
useUnifiedTopology:true,
//useCreateIndex:true
}).then(()=>{
    console.log("Connected");
}).catch((e)=>{
    console.log(e);
})