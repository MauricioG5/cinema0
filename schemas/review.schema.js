const Joi = require('joi');

const id = Joi.number().integer();
const userId = Joi.number().integer();
const movieId = Joi.number().integer();
const score = Joi.number().integer().max(5).min(1);
const review = Joi.string();
const offset = Joi.number().integer();
const limit = Joi.number().integer();

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
    score,
    review
});

const queryReviewSchema = Joi.object({
    limit,
    offset
});

module.exports = { createReviewSchema, getReviewSchema, updateReviewSchema, queryReviewSchema }