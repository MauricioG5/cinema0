const Joi = require('joi')

const id = Joi.number().integer();
const categoryId = Joi.number().integer();
const movieId = Joi.number().integer();
const name = Joi.string();
const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createCategorySchema = Joi.object({
    name: name.required(),
});

const getCategorySchema = Joi.object({
    id: id.required()
});

const updateCategorySchema = Joi.object({
    name
});

const addMovieSchema = Joi.object({
    categoryId: categoryId.required(),
    movieId: movieId.required()
});

const queryCategorySchema = Joi.object({
    offset,
    limit
});

module.exports = { createCategorySchema, getCategorySchema, updateCategorySchema, addMovieSchema, queryCategorySchema }