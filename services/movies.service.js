const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');


class MovieService {

    constructor() {

    }

    async list() {
        const movieList = await models.Movie.findAll( { include: ['category', 'director'] });
        return movieList;
    }

    async create(data) {
        const movie = await models.Movie.create(data);
        return movie;
    }

    async update(id, data) {
        const movie = await this.findOne(id);
        const updatedMovie = await movie.update(data);
        return updatedMovie;

    }

    async findOne(id) {
        const movie = await models.Movie.findByPk(id, {
            include: ['category', 'director', 'reviews']
        });
        if(!movie){
            throw new boom.notFound('Movie not Found');
        }
        return movie;
    }

    async delete(id) {
        const movie = await this.findOne(id);
        movie.destroy();
        return id;
    }

}

module.exports = MovieService