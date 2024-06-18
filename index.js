const express = require("express");
const path = require("path");
const app = express();
const ejsMate = require('ejs-mate');
const mongoose = require("mongoose");
const methodOverride = require("method-override")
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

const virtuallabRoutes = require("./routes/virtuallab")
const userRoutes = require("./routes/user");

app.engine('ejs', ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "/assets")));
app.use(express.static(path.join(__dirname, "/public")));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended : true}));
app.use(express.json())

const sessionConfig = {
    resave : false,
    secret : "thisismysecret",
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge : 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig));
app.use(flash());

// Passport related middleware setup 
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success")
    res.locals.error = req.flash("error")
    next();
})

app.use("/virtuallab", virtuallabRoutes);
app.use("/", userRoutes)

mongoose.connect("mongodb://127.0.0.1:27017/code")
    .then(() => {
        console.log("Mongo Connection Open!");
    })
    .catch((e) => {
        console.log("Mongo Connection Error!");
        console.log(e);
    })



app.get("*", (req, res) => {
    res.send("PAGE NOT FOUND!!");
})


app.use((err, req, res, next) => {
    const {statusCode = 500} = err;
    if(!err.message){
        err.message = "Something Went Wrong!"
    }
    res.status(statusCode).render("error", {err});
})

app.listen(3000, () => {
    console.log("Listening on Server Port 3000");
})