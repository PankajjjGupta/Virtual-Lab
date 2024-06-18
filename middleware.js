const {codeSchema} = require("./schemas");
const Code = require("./models/code");

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash("error", "You are not signed in!")
        return res.redirect("/login")
    }
    next()
}

module.exports.isAuthor = async(req,res,next) => {
    const {id} = req.params;
    const repl = await Code.findById(id);
    console.log(repl)
    if(!repl.author.equals(req.user._id) ) {
        req.flash("error", "You dont have permission to do that!");
        return res.redirect(`/virtuallab/${id}`);
    }
    next();
}

module.exports.storeReturnTo = (req, res, next) => {
    res.locals.returnTo = req.session.returnTo;
    next();
}

module.exports.validateCode = (req, res, next) => {
    const {error} = codeSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(",");
        console.log(msg);
        req.flash("error", msg);
        res.redirect("/virtuallab/new");
        // throw new AppError(msg, 400);
    }
    else{
        next();
    }
}