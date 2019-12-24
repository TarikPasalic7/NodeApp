
var express=require("express");
var router=express.Router();//express.Router({mergePramas:true}); Ovako pisete ako pokusavate setovati defaultni router sa parametrom.PR app.use("/camp/:id/comment"...)
var campground=require("../models/camp");
var comment=require("../models/comment");
router.get("/camp/:id/comment/new",isloggedin,(req,res)=>{
    
    campground.findById(req.params.id,(err,campi)=>{
   
        if(err)
        {
            console.log(err);
        }
else{

    res.render("comment/new",{camp:campi});
}


    });


});

router.post("/camp/:id/comment",isloggedin,(req,res)=>{

    campground.findById(req.params.id,(err,camp)=>{
    if(err)
    {
        console.log(err);
    }
    else{
        
      comment.create(req.body.comment,(err,com)=>{
             if(err)
             {
                 console.log(err);
  
             }
             else{
                 com.author.id=req.user._id;
                 com.author.username=req.user.username;
                 com.save();
              camp.comment.push(com);
              camp.save();
                  res.redirect("/camp/"+ camp._id);
             }
        
  
      });
  
    }
  
  
  
    });
  
  });
  router.get("/camp/:id/comment/:comment_id/edit",checkcommentownership,(req,res)=>{
         comment.findById(req.params.comment_id,(err,fcomm)=>{
           if(err)
           {
               console.log(err);
           }
           else{

            res.render("comment/edit",{campid:req.params.id,comm:fcomm});

           }



         });
    


});
router.put("/camp/:id/comment/:comment_id",checkcommentownership,(req,res)=>{

  comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,(err,commupdated)=>{
  
    if(err)
    {
        res.redirect("back");
       
    }
    else{
        res.redirect("/camp/"+ req.params.id);
    }  


  });                                   //comment je objekat koji sadrzi sve podatke u edit.ejs



});
router.delete("/camp/:id/comment/:comment_id",checkcommentownership,(req,res)=>{

comment.findByIdAndRemove(req.params.comment_id,(err,delcomm)=>{
if(err)
{
    res.redirect("back");
}
else{

    res.redirect("/camp/"+req.params.id);
}
    



});




});
  function isloggedin(req,res,next){  ///Middleware

    if(req.isAuthenticated())
    {
        return next();
    }
    else{
        res.redirect("/login");
    }



}

function checkcommentownership(req,res,next){
if(req.isAuthenticated()){
comment.findById(req.params.comment_id,(err,comm)=>{

    if(err)
    {
        res.redirect("back");
    }
    else{
      if(comm.author.id.equals(req.user._id))
      {
         next();
      }
      else{
        res.redirect("back");
      }

    }


});




}
else{
    res.redirect("back");
}




}

  module.exports=router;