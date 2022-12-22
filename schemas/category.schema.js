const Joi = require('joi')

const id = Joi.number().integer();
const name = Joi.string();

const createCategorySchema = Joi.object({
    name: name.required(),
});

const getCategorySchema = Joi.object({
    id: id.required()
});

const updateCategorySchema = Joi.object({
    name
});


module.exports = { createCategorySchema, getCategorySchema, updateCategorySchema }