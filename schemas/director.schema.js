const Joi = require('joi')

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const lastName = Joi.string().min(2).max(15);
const photo = Joi.string().uri();
const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createDirectorSchema = Joi.object({
    name: name.required(),
    lastName: lastName.required(),
    photo: photo.required()
});

const getDirectorSchema = Joi.object({
    id: id.required()
});

const updateDirectorSchema = Joi.object({
    name,
    lastName,
    photo
});

const queryDirectorSchema = Joi.object({
    limit,
    offset
});


module.exports = { createDirectorSchema, getDirectorSchema, updateDirectorSchema, queryDirectorSchema }