const Joi = require('joi')

const id = Joi.number().integer();
const name = Joi.string();
const img = Joi.string().uri();
const minAge = Joi.number().min(12).max(18);
const releaseYear = Joi.number().integer().min(1895).max(2022);
const categoryId = Joi.number().integer().min(0);
const directorId = Joi.number().integer().min(0);
const sinopsis = Joi.string().min(30).max(500);
const movieId = Joi.number().integer();
const actorId = Joi.number().integer();
const characterName = Joi.string().min(3).max(25);

const createMovieSchema = Joi.object({
    name: name.required(),
    img: img.required(),
    releaseYear: releaseYear.required(),
    minAge,
    categoryId,
    directorId,
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
    directorId,
    sinopsis
});

const addActorSchema = Joi.object({
    movieId: movieId.required(),
    actorId: actorId.required(),
    characterName: characterName.required()
});
const removeActorSchema = Joi.object({
    movieId: movieId.required(),
    actorId: actorId.required(),
    characterName: characterName
});


module.exports = { createMovieSchema, getMovieSchema, updateMovieSchema, addActorSchema, removeActorSchema }