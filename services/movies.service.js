const sequelize = require('sequelize')


class movieService {

    constructor() {

    }

    generate() {

    }

    async create(data) {
        return { rta: 'created', data }
    }

    async update(id, changes) {
        return {
            rta: 'updated',
            id,
            changes
        }

    }

    async list() {
        return { rta: 'lista' }
    }

    async findOne(id) {
        return {id, name: 'unaPelicula'}
    }

    async delete(id) {
        return {id, done: true}
    }

}

module.exports = movieService