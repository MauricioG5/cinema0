const Joi = require('joi')

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const lastName = Joi.string().min(2).max(15);
const photo = Joi.string().uri();

const createActorSchema = Joi.object({
    name: name.required(),
    lastName: lastName.required(),
    photo: photo.required()
});

const getActorSchema = Joi.object({
    id: id.required()
});

const updateActorSchema = Joi.object({
    name,
    lastName,
    photo
});


module.exports = { createActorSchema, getActorSchema, updateActorSchema };