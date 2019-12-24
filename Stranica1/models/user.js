var mongoose=require("mongoose");
var passoprtlocalmangoose=require("passport-local-mongoose");
var userschema=new mongoose.Schema({
  
    
     username:String,
     password:String,
     


});
userschema.plugin(passoprtlocalmangoose);//ading methods to user  and important functionality

module.exports=mongoose.model("user",userschema);

