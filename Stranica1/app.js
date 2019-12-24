var express=require("express");
var app=express();
var bodyparser=require("body-parser");
var mongoose=require("mongoose");
var flash=require("connect-flash");
var passport=require("passport");
var localstrategy=require("passport-local");
var methodoverride=require("method-override");
var camproutes=require("./routes/camp"),
      commentroutes=require("./routes/comment"),
      indexroutes=require("./routes/index")  
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");
mongoose.connect("mongodb://localhost/webapp");


//var campground=mongoose.model("camp",campschema);
var campground=require("./models/camp");
var comment=require("./models/comment");
var user=require("./models/user");
//var user=require("/models/user");
/* campground.create({
 name:"Tarik",
 imgurl:"https://hdfreewallpaper.net/wp-content/uploads/2014/07/beautiful-view-in-morning.jpg"

},(error,camp)=>{
if(error)
console.log(error)
else{

    console.log (camp);
}



});
*/


/*
var camps=[
    {
        name:"Tarik",image:"https://wallpaper-house.com/data/out/6/wallpaper2you_134908.jpg"
    },
    {
        name:"Teša",image:"https://hdfreewallpaper.net/wp-content/uploads/2014/07/beautiful-view-in-morning.jpg"
    }
    
    
    ];*/
   
    app.use(require("express-session")({
   
        secret:"APPLICATON",
        resave:false,
        saveUninitialized:false

    }));
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new localstrategy(user.authenticate()));//method from  passportlocalmongoose.In line 203 using this method
    passport.serializeUser(user.serializeUser());
    passport.deserializeUser(user.deserializeUser());

    app.use((req,res,next)=>{
     res.locals.qurentuser=req.user; // use user data to all functions .qurentuser is local variable that you have been named
    res.locals.error=req.flash("error");
     res.locals.success=req.flash("success");
     next();
       

    });
    app.use(methodoverride("_method"));//za put i delete
    
    app.use(camproutes);// cann add a starting route app.use("/camp",camproutes).Than you dont need to write rouer.use("/camp"...)..,just router.use("/"...)
    app.use(commentroutes);
    app.use(indexroutes);
app.listen(3000  || process.env.PORT,function(){


    console.log("Web app server has started");
});