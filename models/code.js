const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const codeSchema = new Schema({
    title : String,
    code : String,
    languagevalue : String,
    author : {
        type : Schema.Types.ObjectId,
        ref : "User"
    }
});

module.exports = mongoose.model("Code", codeSchema);