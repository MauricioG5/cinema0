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
            const list = await service.list(query);
            res.status(200).json(list)
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
            const rta = await service.create(data);
            res.status(201).json(rta);
        } catch (e) {
            next(e);
        }
    });

// Only the owner of a review must be able tu update it
router.patch('/:id',
    passport.authenticate('jwt', { session: false }),
    validationHandler(getReviewSchema, 'params'),
    validationHandler(updateReviewSchema, 'body'),
    async (req, res, next) => {
        const { id } = req.params;
        const data = req.body;
        try {
            const rta = await service.update(id, data);
            res.status(201).json(rta);
        } catch (e) {
            next(e);
        }
    });

// Only the owner of a review must be able tu delete it
router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    validationHandler(getReviewSchema, 'params'),
    async (req, res, next) => {
        const { id } = req.params; id;
        try {
            const movie = await service.delete(id);
            res.status(200).json(movie);
        } catch (e) {
            next(e);
        }
    });
    
router.get('/:id',
    validationHandler(getReviewSchema, 'params'),
    async (req, res, next) => {
        const { id } = req.params; id;
        try {
            const movie = await service.findOne(id);
            res.status(200).json(movie);
        } catch (e) {
            next(e);
        }
    });

module.exports = router;

