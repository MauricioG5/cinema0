const Joi = require('joi')

const id = Joi.number().integer();
const actorId = Joi.number().integer();
const movieId = Joi.number().integer();

const createDistributionSchema = Joi.object({
    actorId: actorId.required(),
    movieId: movieId.required(),
    
});

const getDistributionSchema = Joi.object({
    id: id.required()
});

const updateDistributionSchema = Joi.object({
    actorId,
    movieId,

});


module.exports = { createDistributionSchema, getDistributionSchema, updateDistributionSchema }