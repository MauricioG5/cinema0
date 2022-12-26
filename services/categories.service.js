const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');


class CategoryService {

    constructor() {

    }

    async list() {
        const categoryList = await models.Category.findAll();
        return categoryList;
    }

    async create(data) {
        const category = await models.Category.create(data);
        return category;
    }

    async update(id, data) {
        const category = await this.findOne(id);
        const updatedCategory = await category.update(data);
        return updatedCategory;

    }

    async findOne(id) {
        const category = await models.Category.findByPk(id);
        if(!category){
            throw new boom.notFound('Category not Found');
        }
        return category;
    }

    async delete(id) {
        const category = await this.findOne(id);
        category.destroy();
        return id;
    }

}

module.exports = CategoryService