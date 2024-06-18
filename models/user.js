const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const UsersSchema = new Schema({
    email : {
        type : String,
        required : true,
        unique : true
    }
})

UsersSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UsersSchema);