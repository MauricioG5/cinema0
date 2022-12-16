'use strict';

const { Movie, MovieSchema, MOVIE_TABLE } = require('../models/movie.model')

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(MOVIE_TABLE, MovieSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(MOVIE_TABLE);
  }
};
