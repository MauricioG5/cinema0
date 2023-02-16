const Joi = require('joi')

const id = Joi.number().integer();
const name = Joi.string();
const email = Joi.string().email();
const password = Joi.string();
const role = Joi.string();
const img = Joi.string().uri();
const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createAdminSchema = Joi.object({
    name: name.required(),
    email: email.required(),
    password: password.required(),
    role: role.required(),
    img: img
});

const UpdateRoleSchema = Joi.object({
    id: id.required(),
    role: role.required()
});


module.exports = { createAdminSchema, UpdateRoleSchema }