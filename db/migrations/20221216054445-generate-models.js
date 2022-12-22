'use strict';

const { Movie, MovieSchema, MOVIE_TABLE } = require('../models/movie.model');
const { Category, CategorySchema, CATEGORY_TABLE } = require('../models/category.model');
const { User, UserSchema, USER_TABLE } = require('../models/user.model');
const { Review, ReviewSchema, REVIEW_TABLE } = require("../models/review.model");

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(MOVIE_TABLE, MovieSchema);
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(REVIEW_TABLE, ReviewSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(MOVIE_TABLE);
    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(REVIEW_TABLE);
  }
};
