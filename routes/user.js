const express = require("express")
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const catchAsync = require("../utils/catchAsync")
const reviews = require("../controllers/users")

router.get("/register", reviews.renderRegister)

router.post("/register", catchAsync(reviews.register));

router.get("/login", reviews.renderLogin)

router.post("/login", passport.authenticate("local", {failureFlash : true, failureRedirect : "/login"}), reviews.login)

router.get("/logout", reviews.logout)

module.exports = router;
