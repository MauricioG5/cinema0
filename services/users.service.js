const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');
const bcrypt = require('bcrypt');
const { config } = require('../config/config')

class UserService {

    constructor() {
        
    }
    // this.createFirstAdmin();

    async list(query) {
        const options = {
            limit: query?.limit ?? 2,
            offset: query?.offset ?? 0,
        }
        const rta = await models.User.findAll(options);

        rta.forEach(user => delete user.dataValues.password);
        return rta;
    }

    async findOne(id) {
        const found = await models.User.findByPk(id, {
            include: 'reviews'
        });
        if (!found) {
            throw new boom.notFound('User not found');
        }
        delete found.dataValues.password;
        return found;
    }

    async findByEmail(email) {
        const found = await models.User.findOne({
            where: { email }
        });
        if (!found) {
            throw new boom.notFound('User not found');
        }
        return found;
    }

    async create(data) {
        const hash = await bcrypt.hash(data.password, 10);
        const role = 'user';
        const newUser = await models.User.create({
            ...data,
            role,
            password: hash
        });
        delete newUser.dataValues.password
        return newUser;
    }

    async createAdmin(data) {
        const hash = await bcrypt.hash(data.password, 10);
        const newUser = await models.User.create({
            ...data,
            password: hash
        });
        delete newUser.dataValues.password
        return newUser;
    }

    async createFirstAdmin() {
        const user = await models.User.findOrCreate({
            where: { name: 'root' },
            defaults: {
                name: 'root',
                password: config.rootPassword,
                email: config.mailSender
            }
        });
    }

    async update(id, data) {
        const user = await this.findOne(id);
        const pass = data?.password;
        if (pass)
            data.password = await bcrypt.hash(pass, 10);
        const updatedUser = await user.update(data);
        delete updatedUser.dataValues.password;
        delete user.dataValues.recoveryToken;
        return updatedUser;
    }

    async delete(id) {
        const user = await this.findOne(id);
        await user.destroy();
        return id;
    }
}

module.exports = UserService;
