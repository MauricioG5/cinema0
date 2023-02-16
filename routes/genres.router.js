const express = require('express');
const passport = require('passport');
const validationHandler = require('../middlewares/validation.handler')
const { checkRoles } = require('../middlewares/auth.handler')
const { addMovieSchema, createGenreSchema, updateGenreSchema, getGenreSchema, queryGenreSchema } = require('../schemas/genre.schema')
const GenreService = require('../services/genres.service');

const router = express.Router();
const service = new GenreService();

router.get('/',
    validationHandler(queryGenreSchema, 'query'),
    async (req, res, next) => {
        const query = req.query;
        try {
            const list = await service.list(query);
            res.status(200).json(list)
        } catch (e) {
            next(e);
        }
    });

router.post('/add-movie',
    passport.authenticate('jwt', { session: false }),
    validationHandler(addMovieSchema, 'body'),
    async (req, res, next) => {
        const data = req.body;
        try {
            const rta = await service.addMovie(data);
            res.status(201).json(rta);
        } catch (e) {
            next(e);
        }
    });

router.delete('/remove-movie',
    passport.authenticate('jwt', { session: false }),
    validationHandler(addMovieSchema, 'body'),
    async (req, res, next) => {
        const data = req.body;
        try {
            const rta = await service.removeMovie(data);
            res.status(200).json(rta);
        } catch (e) {
            next(e);
        }
    });

router.post('/',
    passport.authenticate('jwt', { session: false }),
    checkRoles(['admin']),
    validationHandler(createGenreSchema, 'body'),
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
    passport.authenticate('jwt', { session: false }),
    checkRoles(['admin']),
    validationHandler(getGenreSchema, 'params'),
    validationHandler(updateGenreSchema, 'body'),
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
    checkRoles(['admin']),
    validationHandler(getGenreSchema, 'params'),
    async (req, res, next) => {
        const { id } = req.params; id;
        try {
            const category = await service.delete(id);
            res.status(200).json(category);
        } catch (e) {
            next(e);
        }
    });

router.get('/:id',
    validationHandler(getGenreSchema, 'params'),
    async (req, res, next) => {
        const { id } = req.params; id;
        try {
            const category = await service.findOne(id);
            res.status(200).json(category);
        } catch (e) {
            next(e);
        }
    });

module.exports = router;

