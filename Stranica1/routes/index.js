
var express=require("express");
var router=express.Router();
var passport=require("passport");
var user=require("../models/user");
router.get("/",(req,res)=>{

    res.render("main");

})




router.get("/register",(req,res)=>{

res.render("register");
});

router.post("/register",(req,res)=>{

    var newuser=new user({username:req.body.username});
    user.register(newuser,req.body.password,(err,user)=>{
     
        if(err)
        {
            console.log(err);
            return res.render("register");
        }
      passport.authenticate("local")(req,res,()=>{
            
         res.redirect("/camp");
        
      });
    });



});
router.get("/login",(req,res)=>{

res.render("login");

});
router.post("/login",passport.authenticate("local",{successRedirect:"/camp",failureRedirect:"/login"}),(req,res)=>{ //using method authenticate in the midleware

    res.render("login");
    
    });

   router.get("/logout",(req,res)=>{

   req.logout();
   req.flash("success","Logged out");
   res.redirect("/camp");


    });
function isloggedin(req,res,next){  ///Middleware

    if(req.isAuthenticated())
    {
        return next();
    }
    else{
        res.redirect("/login");
    }



}module.exports=router;