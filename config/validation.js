const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    try {
        const schema = Joi.object({
            name:Joi.string()
                .required(),
            email:Joi.string()
                .required()
                .email(),
            password:Joi.string()
                .required()
                .min(8)
        })
        return schema.validate(data).error.details[0].message;
    } catch (error) {
        return false
    }
}
const loginValidation = (data) => {
    try {
        const schema = Joi.object({
            email:Joi.string()
                .required()
                .email(),
            password:Joi.required()
                .min(1)
        })
        return schema.validate(data).error.details[0].message;
    } catch (error) {
        return false
    }
}

module.exports = {registerValidation,loginValidation};