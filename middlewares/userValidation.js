const Joi = require('joi');


const schema = Joi.object().keys({
    name: Joi.string().alphanum(),
    email: Joi.string().email().required(),
    // phone: Joi.string().regex(/^\d{3}-\d{3}-\d{4}$/).required(),
    password: Joi.string().min(6).required(),
    // confirmPassword: Joi.string().valid(joi.ref('password')).required(),
    dp: Joi.string()
})

module.exports = schema;