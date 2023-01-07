const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');
const { QueryTypes, Op } = require('sequelize');

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
            include: ['category', 'director', 'reviews', 'actors']
        });
        if(!movie){
            throw new boom.notFound('Movie not Found');
        }
        return movie;
    }

    async addActor(data){
        const newActor = await models.Distribution.create(data);
        return newActor;
    }

    //In this sequelize version, raw querys doesn't exist
    //I could not delete an actor using a raw query, I had to use destroy({where{...}})
    async removeActor(data){
        const movieId = data.movieId;
        const actorId = data.actorId;
        // const query = `DELETE FROM distribution
        // WHERE movie_id = ${movieId} AND actor_id = ${actorId}`;
        const rta = await models.Distribution.destroy({
            where: {[Op.and]: [
                {movieId: movieId},
                {actorId: actorId}
        ]}});
        return rta;
    }

    async delete(id) {
        const movie = await this.findOne(id);
        movie.destroy();
        return id;
    }

}

module.exports = MovieService