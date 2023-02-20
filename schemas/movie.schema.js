const Joi = require('joi')

const id = Joi.number().integer();
const name = Joi.string();
const img = Joi.string().uri();
const minAge = Joi.number().min(12).max(18);
const releaseYear = Joi.number().integer().min(1895).max(2022);
const directorId = Joi.number().integer().min(0);
const sinopsis = Joi.string().min(30).max(500);
const movieId = Joi.number().integer();
const actorId = Joi.number().integer();
const characterName = Joi.string().min(3).max(25);
const searchInput = Joi.string();
const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createMovieSchema = Joi.object({
    name: name.required(),
    img: img.required(),
    releaseYear: releaseYear.required(),
    minAge,
    directorId,
    sinopsis
});

const getMovieSchema = Joi.object({
    id: id.required()
});

const updateMovieSchema = Joi.object({
    name,
    img,
    minAge,
    releaseYear,
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

const queryMovieSchema = Joi.object({
    limit,
    offset
});

const searchSchema = Joi.object({
    searchInput: searchInput.required()
});


module.exports = { 
    createMovieSchema, getMovieSchema,
     updateMovieSchema,addActorSchema, 
     removeActorSchema, queryMovieSchema,
      searchSchema }