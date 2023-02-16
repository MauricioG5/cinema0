const express = require('express');
const validationHandler = require('../middlewares/validation.handler')
const { checkRoles } = require('../middlewares/auth.handler')
const { createUserSchema, getUserSchema, updateUserSchema, queryUserSchema } = require('../schemas/user.schema')
const { createAdminSchema, UpdateRoleSchema } = require('../schemas/admin.schema')
const UserService = require('../services/users.service')
const passport = require('passport');

const router = express.Router();
const service = new UserService();
service.createFirstAdmin();


router.get('/',
    passport.authenticate('jwt', { session: false }),
    checkRoles(['admin']),
    validationHandler(queryUserSchema, 'query'),
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
    validationHandler(createUserSchema, 'body'),
    async (req, res, next) => {
        const data = req.body;
        try {
            const rta = await service.create(data);
            res.status(201).json(rta);
        } catch (e) {
            next(e);
        }
    });

router.post('/admin',
    passport.authenticate('jwt', { session: false }),
    checkRoles(['admin']),
    validationHandler(createAdminSchema, 'body'),
    async (req, res, next) => {
        const data = req.body;
        try {
            const rta = await service.createAdmin(data);
            res.status(201).json(rta);
        } catch (e) {
            next(e);
        }
    });

router.patch('/:id',
    passport.authenticate('jwt', { session: false }),
    checkRoles(['admin']),
    validationHandler(getUserSchema, 'params'),
    validationHandler(updateUserSchema, 'body'),
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
    validationHandler(getUserSchema, 'params'),
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
    passport.authenticate('jwt', { session: false }),
    checkRoles(['admin']),
    validationHandler(getUserSchema, 'params'),
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

