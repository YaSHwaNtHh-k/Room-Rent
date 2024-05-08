const User=require("../models/user.js")

module.exports.signupget=(req,res)=>{
    res.render("users/signup.ejs")
}
module.exports.profileform=async(req,res)=>{
    let user=res.locals.currUser
    res.render("listings/user.ejs",{user})
}

module.exports.signuppost=async(req,res,next)=>{
    try{
        const { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeUser = await User.register(newUser, password);
        req.login(registeUser,(err)=>{
        if(err){
            next(err)
        }
        req.flash("success","Successfully Signup")
        res.redirect("/listings")
    })
    console.log(registeUser)
    }
    catch(e){
        req.flash("failure","User with This Credintials Already Exists")
        res.redirect("/signup")
    }
}

module.exports.loginget=(req,res)=>{
    res.render("users/login.ejs")
}
module.exports.loginpost=async(req,res)=>{
    req.flash("success","Successfully Login!")
    if(!res.locals.redirectUrl){
        return res.redirect("/listings")
    }
    res.redirect(res.locals.redirectUrl)
}

module.exports.logout=(req,res)=>{
    req.logOut((err)=>{
        if(err){
            next(err);
        }
    })
    req.flash("success","logged out Successfully!")
    res.redirect("/listings")
}