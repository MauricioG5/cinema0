const express = require('express');
const validationHandler = require('../middlewares/validation.handler')
const { createCategorySchema, getCategorySchema, updateCategorySchema } = require('../schemas/category.schema')
const CategoryService = require('../services/categories.service');

const router = express.Router();
const service = new CategoryService();

router.get('/', async (req, res, next) => {
    try {
        const list = await service.list();
        res.status(200).json(list)
    } catch (e) {
        next(e);
    }
});

router.post('/',
    validationHandler(createCategorySchema, 'body'),
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
    validationHandler(getCategorySchema, 'params'),
    validationHandler(updateCategorySchema, 'body'),
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
    validationHandler(getCategorySchema, 'params'),
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
    validationHandler(getCategorySchema, 'params'),
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

