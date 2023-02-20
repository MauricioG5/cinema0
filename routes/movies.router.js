const express = require('express');
const passport = require('passport');
const validationHandler = require('../middlewares/validation.handler')
const { checkRoles } = require('../middlewares/auth.handler')
const { createMovieSchema, 
    getMovieSchema, updateMovieSchema,
     addActorSchema, removeActorSchema,
      queryMovieSchema, searchSchema } = require('../schemas/movie.schema')

const MovieService = require('../services/movies.service')

const router = express.Router();
const service = new MovieService();

router.get('/',
    validationHandler(queryMovieSchema, 'query'),
    async (req, res, next) => {
        try {
            const list = await service.list(req.query);
            res.status(200).json(list)
        } catch (e) {
            next(e);
        }
    });

router.post('/',
    passport.authenticate('jwt', { session: false }),
    validationHandler(createMovieSchema, 'body'),
    async (req, res, next) => {
        const data = req.body;
        try {
            const rta = await service.create(data);
            res.status(201).json(rta);
        } catch (e) {
            next(e);
        }
    });

router.post('/add-actor',
    passport.authenticate('jwt', { session: false }),
    validationHandler(addActorSchema, 'body'),
    async (req, res, next) => {
        const data = req.body;
        try {
            const rta = await service.addActor(data);
            res.status(201).json(rta);
        } catch (e) {
            next(e);
        }
    });

    router.post('/search', 
    validationHandler(searchSchema, 'body'),
    async (req, res, next) => {
        const body = req.body;
        const searchInput = body?.input;
        try{
            const rta = await service.search(searchInput);
            res.status(200).json(rta);
        } catch(e) {
            next(e);
        }
    });

router.delete('/remove-actor',
    passport.authenticate('jwt', { session: false }),
    validationHandler(removeActorSchema, 'body'),
    async (req, res, next) => {
        const data = req.body;
        try {
            const rta = await service.removeActor(data);
            res.status(200).json(rta);
        } catch (e) {
            next(e);
        }
    });

router.patch('/:id',
    passport.authenticate('jwt', { session: false }),
    validationHandler(getMovieSchema, 'params'),
    validationHandler(updateMovieSchema, 'body'),
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
    passport.authenticate('jwt', { session: false }),
    validationHandler(getMovieSchema, 'params'),
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
    validationHandler(getMovieSchema, 'params'),
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

