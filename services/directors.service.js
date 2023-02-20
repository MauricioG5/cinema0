const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');


class DirectorService {

    constructor() { }

    async list(query) {
        const options = {
            limit: query?.limit ?? 2,
            offset: query?.offset ?? 0,
            }
        const rta = await models.Director.findAll(options);
        return rta;
    }

    async findOne(id) {
        const found = await models.Director.findByPk(id, { include: 'movies'});
        if (!found) {
            throw new boom.notFound('Director not found')
        }
        return found;
    }

    async create(data) {
        const newDirector = await models.Director.create(data);
        return newDirector;
    }

    async update(id, data) {
        const director = await this.findOne(id);
        const updatedDirector = await director.update(data);
        return updatedDirector;
    }

    async delete(id) {
        const director = await this.findOne(id);
        await director.destroy();
        return id;
    }

    async search(input) {
        const options = {
            where: {
                [Op.or]: [{name: input}, {lastname: input}]
            }
        };
        const rta = await models.Actor.findAll(options);
        return rta;
    }
}

module.exports = DirectorService;
