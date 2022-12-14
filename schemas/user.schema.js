const Joi = require('joi')

const id = Joi.number().integer();
const name = Joi.string();
const email = Joi.string().email();
const password = Joi.string();
const role = Joi.string();
const img = Joi.string().uri();

const createUserSchema = Joi.object({
    name: name.required(),
    email: email.required(),
    password: password.required(),
    role: role,
    img: img
});

const getUserSchema = Joi.object({
    id: id.required()
});

const updateUserSchema = Joi.object({
    name,
    email,
    password,
    role,
    img
});


module.exports = { createUserSchema, getUserSchema, updateUserSchema }