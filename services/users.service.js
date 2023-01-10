const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');


class UserService {

    constructor() { }

    async list(query) {
        const options = {
            limit: query?.limit ?? 2,
            offset: query?.offset ?? 0,
            }
        const rta = await models.User.findAll(options);
        return rta;
    }

    async findOne(id) {
        const found = await models.User.findByPk(id, {
            include: 'reviews'
        });
        if (!found) {
            throw new boom.notFound('User not found')
        }
        return found;
    }

    async create(data) {
        const newUser = await models.User.create(data);
        return newUser;
    }

    async update(id, data) {
        const user = await this.findOne(id);
        const updatedUser = await user.update(data);
        return updatedUser;
    }

    async delete(id) {
        const user = await this.findOne(id);
        await user.destroy();
        return id
    }
}

module.exports = UserService;
