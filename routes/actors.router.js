const express = require('express');
const validationHandler = require('../middlewares/validation.handler')
const { createActorSchema, updateActorSchema, getActorSchema, queryActorSchema } = require('../schemas/actor.schema')
const ActorService = require('../services/actors.service')

const router = express.Router();
const service = new ActorService();

router.get('/',
validationHandler(queryActorSchema, 'query'),
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
    validationHandler(createActorSchema, 'body'),
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
    validationHandler(getActorSchema, 'params'),
    validationHandler(updateActorSchema, 'body'),
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
    validationHandler(getActorSchema, 'params'),
    async (req, res, next) => {
        const { id } = req.params; id;
        try {
            const actor = await service.delete(id);
            res.status(200).json(actor);
        } catch (e) {
            next(e);
        }
    });
router.get('/:id',
    validationHandler(getActorSchema, 'params'),
    async (req, res, next) => {
        const { id } = req.params; id;
        try {
            const actor = await service.findOne(id);
            res.status(200).json(actor);
        } catch (e) {
            next(e);
        }
    });

module.exports = router;

