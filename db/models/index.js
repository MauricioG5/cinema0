const { Movie, MovieSchema, MOVIE_TABLE } = require("./movie.model");

function setUpModels(sequelize){
    Movie.init(MovieSchema, Movie.config(sequelize), );
    // console.log('initializing models');
}

module.exports = setUpModels;