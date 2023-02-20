const Joi = require('joi')

const id = Joi.number().integer();
const name = Joi.string();
const email = Joi.string().email();
const password = Joi.string().min(6).max(20);
const img = Joi.string().uri();
const searchInput = Joi.string();
const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createUserSchema = Joi.object({
    name: name.required(),
    email: email.required(),
    password: password.required(),
    img: img
});

const getUserSchema = Joi.object({
    id: id.required()
});

const updateUserSchema = Joi.object({
    name,
    email,
    password,
    img
});

const queryUserSchema = Joi.object({
    limit,
    offset
});


const searchSchema = Joi.object({
    searchInput: searchInput.required()
});


module.exports = {
     createUserSchema, getUserSchema,
      updateUserSchema, queryUserSchema,
       searchSchema }