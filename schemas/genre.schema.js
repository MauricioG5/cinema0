const Joi = require('joi')

const id = Joi.number().integer();
const categoryId = Joi.number().integer();
const movieId = Joi.number().integer();
const name = Joi.string();
const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createGenreSchema = Joi.object({
    name: name.required(),
});

const getGenreSchema = Joi.object({
    id: id.required()
});

const updateGenreSchema = Joi.object({
    name
});

const addMovieSchema = Joi.object({
    categoryId: categoryId.required(),
    movieId: movieId.required()
});

const queryGenreSchema = Joi.object({
    offset,
    limit
});

module.exports = { createGenreSchema, getGenreSchema, updateGenreSchema, addMovieSchema, queryGenreSchema }