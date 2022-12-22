const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class reviewsService {

    constructor(){}

    async list(){
        const list = await models.Review.findAll();
        return list;
    }

    async findOne(id){
        const review = await models.Review.findByPk(id);
        if(!review){
            throw new boom.notFound('Review not found');
        }
        return review;
    }

    async create(data){
        const newReview = await models.Review.create(data);
        return newReview;
    }

    async update(id, data){
        const found = await this.findOne(id);
        const updated = await found.update(data);
        return updated;
    }

    async delete(id){
        const found = await this.findOne(id);
        await found.destroy();
        return id;
    }
}

module.exports = reviewsService;