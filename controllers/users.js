const User = require("../models/user");

module.exports.renderRegister = (req, res) => {
    res.render("user/register")
}

module.exports.register = async(req,res, next) => {
    try {
        const {username, password, email} = req.body;
        const user = new User({username, email});
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, (err) => {
            if(err) next(err)
            req.flash("success", "Succesfully Registered, Welcome!")
            res.redirect("/virtuallab/mycodes")
        })
        
    }catch (err) {
        if(err.code == 11000 && err.keyValue.email) {
            console.dir(err)
            req.flash("error", `Email ${err.keyValue.email} already exist!`)
            res.redirect("/register");
        }else {
            req.flash("error", err.message);
            res.redirect("/register")
        }
    }
}

module.exports.renderLogin = (req, res) => {
    res.render("user/login")
}

module.exports.login = (req, res) => {
    req.flash("success", "Welcome back!");
    res.redirect("/virtuallab/mycodes")
}

module.exports.logout = (req, res) => {
    req.logout(function (err, next) {
        if(err) return next(err);
        req.flash("success", 'Goodbye!');
        res.redirect("/virtuallab/mycodes");
    })

}