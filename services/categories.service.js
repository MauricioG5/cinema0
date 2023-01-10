const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { Op } = require('sequelize');


class CategoryService {

    constructor() {

    }

    async list(query) {
        const options = {
            limit: query?.limit ?? 2,
            offset: query?.offset ?? 0    
        }
        const categoryList = await models.Category.findAll(options);
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
        const category = await models.Category.findByPk(id, {
            include: ['movies']
        });
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

    async addMovie(data){
        const movieCategory = models.MovieCategory.create(data);
        return movieCategory;
    }

    async removeMovie(data){
        const movieId = data.movieId;
        const categoryId = data.categoryId;
        const rta = await models.MovieCategory.destroy({
            where: {[Op.and]: [
                {movieId: movieId},
                {categoryId: categoryId}
        ]}});
        return rta;
    }

}

module.exports = CategoryService