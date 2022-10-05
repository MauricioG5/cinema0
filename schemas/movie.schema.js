const Joi = require('joi')

const id = Joi.number().integer();
const name = Joi.string();
const img = Joi.string().uri();
const minAge = Joi.number().min(12).max(18);
const releaseYear = Joi.number().integer().min(1895).max(2022);
const categoryId = Joi.number().integer().min(0);
const sinopsis = Joi.string().min(30).max(500);

const createMovieSchema = Joi.object({
    name: name.required(),
    img: img.required(),
    minAge,
    releaseYear: releaseYear.required(),
    categoryId: categoryId.required(),
    sinopsis
});

const getMovieSchema = Joi.object({
    id: id.required()
})

const updateMovieSchema = Joi.object({
    name,
    img,
    minAge,
    releaseYear,
    categoryId,
    sinopsis
})


module.exports = { createMovieSchema, getMovieSchema, updateMovieSchema }