const express = require('express');
const { createDistributionSchema, updateDistributionSchema, getDistributionSchema } = require('../schemas/distribution.schema');
const validationHandler = require('../middlewares/validation.handler');
const DistributionService = require('../services/distributions.service')

const router = express.Router();
const service = new DistributionService();

router.get('/',
    async (req, res, next) => {
        try{
            const rta = await service.list();
            res.status(200).json(rta);
        } catch(e){ next(e)}
    }
);

router.post('/',
validationHandler(createDistributionSchema, 'body'),
        async (req, res, next) => {
        const data = req.body;
        try{
            const rta = await service.create(data);
            res.status(201).json(rta);
        } catch(e){ next(e)}
    }
);

router.patch('/:id',
    validationHandler(getDistributionSchema, 'params'),
    validationHandler(updateDistributionSchema, 'body'),
    async (req, res, next) => {
        try{
            const { id } = req.params;
            const data = req.body;
            const rta = await service.update(id, data);
            res.status(200).json(rta);
        } catch(e){ next(e)}
    }
);
router.get('/:id',
    validationHandler(getDistributionSchema, 'params'),
    async (req, res, next) => {
        try{
            const { id } = req.params;
            const rta = await service.findOne(id);
            res.status(200).json(rta);
        } catch(e){ next(e)}
    }
);

router.delete('/:id',
    validationHandler(getDistributionSchema, 'params'),
    async (req, res, next) => {
        try{
            const { id } = req.params;
            const rta = await service.delete(id);
            res.status(200).json(rta);
        } catch(e){ next(e)}
    }
);

module.exports = router;