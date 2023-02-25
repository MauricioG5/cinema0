const express = require('express');
const validationHandler = require('../middlewares/validation.handler');
const { checkRoles } = require('../middlewares/auth.handler');
const { createReviewSchema, getReviewSchema, updateReviewSchema, queryReviewSchema } = require('../schemas/review.schema');
const ReviewService = require('../services/reviews.service');
const passport = require('passport');

const router = express.Router();
const service = new ReviewService();

router.get('/',
    validationHandler(queryReviewSchema, 'query'),
    async (req, res, next) => {
        const query = req.query;
        try {
            const reviews = await service.list(query);
            res.status(200).json(reviews)
        } catch (e) {
            next(e);
        }
    });

router.post('/',
    passport.authenticate('jwt', { session: false }),
    checkRoles(['user']),
    validationHandler(createReviewSchema, 'body'),
    async (req, res, next) => {
        const data = req.body;
        try {
            const review = await service.create(data);
            res.status(201).json(review);
        } catch (e) {
            next(e);
        }
    });

router.patch('/:id',
    passport.authenticate('jwt', { session: false }),
    validationHandler(getReviewSchema, 'params'),
    validationHandler(updateReviewSchema, 'body'),
    async (req, res, next) => {
        const { id } = req.params;
        const data = req.body;
        const userId = req.user.id;
        try {
            const review = await service.update(id, userId, data);
            res.status(201).json(review);
        } catch (e) {
            next(e);
        }
    });

router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    validationHandler(getReviewSchema, 'params'),
    async (req, res, next) => {
        const { id } = req.params;
        const userId = req.user.id;
        try {
            const review = await service.delete(id, userId);
            res.status(200).json(review);
        } catch (e) {
            next(e);
        }
    });
    
router.get('/:id',
    validationHandler(getReviewSchema, 'params'),
    async (req, res, next) => {
        const { id } = req.params; id;
        try {
            const review = await service.findOne(id);
            res.status(200).json(review);
        } catch (e) {
            next(e);
        }
    });

module.exports = router;

