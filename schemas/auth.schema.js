const Joi = require('joi');

const email = Joi.string().email();
const password = Joi.string().min(6).max(20);
const token = Joi.string().regex(
        /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/);

const passwordRecoverySchema = Joi.object({
    email: email.required(),
});

const loginSchema = Joi.object({
    username: email.required(),
    password: password.required(),
});

const changePasswordSchema = Joi.object({
    token: token.required(),
    password: password.required(), 
});

module.exports = { passwordRecoverySchema, loginSchema, changePasswordSchema };