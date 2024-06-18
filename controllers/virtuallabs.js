const intializeCodeInDB = require('../utils/intializeCodeInDB');
const Code = require("../models/code");

module.exports.renderNew = (req, res) => {
    res.render("virtuallab/new")
}

module.exports.createNewLab = async(req, res) => {
    const {title, languagevalue} = req.body.code;
    const code = intializeCodeInDB(languagevalue);
    const repl = new Code({title, languagevalue,code});
    repl.author = req.user;
    await repl.save();
    req.flash("success", "Succesfully made a file!")
    res.redirect(`/virtuallab/${repl._id}`);
}

module.exports.myCodes = async(req, res) => {
    const codes = await Code.find({}).populate("author");
    res.render("virtuallab/mycodes", {codes})
}

module.exports.viewCode = async(req, res, next) => {
    const {id} = req.params;
    const repl = await Code.findById(id).populate("author");
    if(!repl) {
        req.flash("error", "Code not found!");
        res.redirect("/virtuallab/new");
        // return next(new AppError("Code Does Not Exist!", 400))
    }
    res.render("virtuallab/index", {repl});
}

module.exports.saveCode = async(req, res) => {
    const {id} = req.params;
    const repl = await Code.findByIdAndUpdate(id, req.body, {new : true});
    console.log(req.body)
    req.flash("success", "Succesfully saved a file!")
    res.json({"updated" : "true"})
}

module.exports.deleteCode = async(req, res) => {
    const {id} = req.params;
    const repl = await Code.findByIdAndDelete(id);
    console.log(repl)
    req.flash("success", "Succesfully deleted a file!")
    res.redirect("/virtuallab/mycodes");
}