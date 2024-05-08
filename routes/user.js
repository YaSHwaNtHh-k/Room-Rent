const express=require("express")
const router=express.Router()
const User=require("../models/user.js")
const wrapAsync = require("../utils/wrapAsync.js")
const passport = require("passport")
const { saveRedirectUrl } = require("../middleware.js")
const userController=require("../controllers/usercontroller.js")

router
    .route("/profile")
    .get(userController.profileform)

router
    .route("/signup")
    .get(userController.signupget)
    .post(wrapAsync(userController.signuppost))

router
    .route("/login")
    .get(userController.loginget)
    .post(saveRedirectUrl,
    passport.authenticate('local',{
        failureRedirect:"/login",
        failureFlash:true,
    }), 
    userController.loginpost
    )

router.get("/logout",userController.logout)

module.exports=router;