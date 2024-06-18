const Joi = require("joi");

module.exports.codeSchema = Joi.object({
    code : Joi.object({
        title : Joi.string().required(),
        languagevalue : Joi.string().required().pattern(/^(62|54|70|75)$/)
    }).required()
})