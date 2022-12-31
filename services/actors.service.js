const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');


class ActorService {

    constructor() { }

    async list() {
        const rta = await models.Actor.findAll();
        return rta;
    }

    async findOne(id) {
        const found = await models.Actor.findByPk(id);
        if (!found) {
            throw new boom.notFound('Actor not found')
        }
        return found;
    }

    async create(data) {
        const newActor = await models.Actor.create(data);
        return newActor;
    }

    async update(id, data) {
        const actor = await this.findOne(id);
        const updatedActor = await actor.update(data);
        return updatedActor;
    }

    async delete(id) {
        const actor = await this.findOne(id);
        await actor.destroy();
        return id;
    }
}

module.exports = ActorService;
