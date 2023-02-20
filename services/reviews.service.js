const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class ReviewService {

    constructor(){}

    async list(query){
        const options = {
            limit: query?.limit ?? 2,
            offset: query?.offset ?? 0,
            }
        const list = await models.Review.findAll(options);
        return list;
    }

    async findOne(id){
        const review = await models.Review.findByPk(id,
            { include: [ {
                model: models.User,
                as: 'user',
                attributes: ['name', 'email']
            },
            {
                model: models.Movie,
                as: 'movie',
                attributes: ['id','name',]
            }
        ]});

        if(!review){
            throw new boom.notFound('Review not found');
        }
        return review;
    }

    async create(data){
        const newReview = await models.Review.create(data);
        return newReview;
    }

    async update(id, userId, data){
        const foundReview = await this.findOne(id);
        if(foundReview.userId != userId)
            throw new boom.unauthorized();
        const updatedReview = await foundReview.update(data);
        return updatedReview;
    }

    async delete(id){
        const found = await this.findOne(id);
        await found.destroy();
        return id;
    }
}

module.exports = ReviewService;