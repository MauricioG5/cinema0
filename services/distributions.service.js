const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class DistributionService {

    constructor(){}

    async list(){
        const list = await models.Distribution.findAll();
        return list;
    }

    async findOne(id){
        const review = await models.Distribution.findByPk(id);
        if(!review){
            throw new boom.notFound('Distribution not found');
        }
        return review;
    }

    async create(data){
        const newDistribution = await models.Distribution.create(data);
        return newDistribution;
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

module.exports = DistributionService;