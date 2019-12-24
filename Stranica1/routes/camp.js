
var express=require("express");
var router=express.Router();
var campground=require("../models/camp");

router.get("/camp",(req,res)=>{
    campground.find({},(eror,camps)=>{
    if(eror)
    console.log(eror);
    else{
        res.render("camp/camp",{campa:camps,qurentuser:req.user});
    }
    
    
    });
    
    
    });
    router.post("/camp",isloggedin,(req,res)=>{
      
        var name=req.body.name;
        var url=req.body.imgurl;
        var desc=req.body.desc;
        var author={
           id:req.user._id,
           username:req.user.username
        }
        var newcamp={name:name,imgurl:url,description:desc,author:author};
        campground.create(newcamp,(err,camp)=>{
         if(err)
         console.log(err);
         else
         res.redirect("/camp");
    
    
        });
        
    
    
    });
    
    router.get("/camp/new",isloggedin,(req,res)=>{
    
    res.render("camp/new.ejs");
    
    });
    
    router.get("/camp/:id",(req,res)=>{
    
    campground.findById(req.params.id).populate("comment").exec((err,campf)=>{
    
    if(err)
    console.log(err);
    else
    {
     res.render("camp/show",{camp:campf});
    }
    
    
    });
    
     
    
    });

    router.get("/camp/:idd/edit",checkcampowner,(req,res)=>{
           
                campground.findById(req.params.idd,(err,camp)=>{
                 
                                res.render("camp/edit",{campid:camp});
                          
                    
          
 });
      
       
         

    });
    router.put("/camp/:idd",checkcampowner,(req,res)=>{
        
       campground.findByIdAndUpdate(req.params.idd,req.body.camps,(err,campup)=>{
         
            if(err)
            {
                console.log(err);
            }
            else{
               res.redirect("/camp/"+ req.params.idd)
            }



       });


    });
    router.delete("/camp/:idd",checkcampowner,(req,res)=>{

    //res.send("adsaadaad");
    campground.findByIdAndRemove(req.params.idd,(err,del)=>{

          if(err)
          {
              console.log(err);
          }
          else{

            res.redirect("/camp");
          }


    });


    });



    function isloggedin(req,res,next){  ///Middleware

        if(req.isAuthenticated())
        {
            return next();
        }
        else{
            req.flash("error","Please login first");
            res.redirect("/login");
        }
    
    
    }
    function checkcampowner(req,res,next){

        if(req.isAuthenticated())
        {
            campground.findById(req.params.idd,(err,camp)=>{
                if(err)
                res.redirect("back");
                else
                {
                          if(camp.author.id.equals(req.user._id))
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