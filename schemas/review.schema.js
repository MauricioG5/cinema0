const Joi = require('joi')

const id = Joi.number().integer();
const userId = Joi.number().integer();
const movieId = Joi.number().integer();
const score = Joi.number().integer();
const review = Joi.string();

const createReviewSchema = Joi.object({
    userId: userId.required(),
    movieId: movieId.required(),
    score: score.required(),
    review: review.required(),
});

const getReviewSchema = Joi.object({
    id: id.required()
});

const updateReviewSchema = Joi.object({
    userId,
    movieId,
    score,
    review
});


module.exports = { createReviewSchema, getReviewSchema, updateReviewSchema }