const express = require('express');
const validationHandler = require('../middlewares/validation.handler')
const { createReviewSchema, getReviewSchema, updateReviewSchema } = require('../schemas/review.schema')
const ReviewService = require('../services/reviews.service')

const router = express.Router();
const service = new ReviewService();

router.get('/', async (req, res, next) => {
    try {
        const list = await service.list();
        res.status(200).json(list)
    } catch (e) {
        next(e);
    }
});

router.post('/',
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

    router.patch('/:id',
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

router.delete('/:id',
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

