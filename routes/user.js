const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");


router
.route("/signup")
.get(userController.renderSignUpform)
.post(wrapAsync(userController.signup));

router.route("/login")
.get(userController.renderLoginform)
.post(saveRedirectUrl,passport.authenticate("local",
    {failureRedirect:'/login',
    failureFlash:true}),userController.login);

// router.get("/signup",userController.renderSignUpform);

// router.post("/signup",wrapAsync(userController.signup));

// router.get("/login",userController.renderLoginform);

// router.post("/login",saveRedirectUrl,passport.authenticate("local",
//     {failureRedirect:'/login',
//     failureFlash:true}),userController.login);

router.get("/logout",userController.logout);

module.exports=router;