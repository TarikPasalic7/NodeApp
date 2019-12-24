var mongoose=require("mongoose");

var campschema=new mongoose.Schema({

    name:String,
    imgurl:String,
    description:String,
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"

        },
         username:String
    },
    comment:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"comment"
        }
    ]
   
   });

   module.exports=mongoose.model("camp",campschema);