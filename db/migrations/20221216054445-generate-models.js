'use strict';

const { DataTypes } = require('sequelize');
const { Movie, MovieSchema, MOVIE_TABLE } = require('../models/movie.model');
const { Category, CategorySchema, CATEGORY_TABLE } = require('../models/category.model');
const { User, UserSchema, USER_TABLE } = require('../models/user.model');
const { Review, ReviewSchema, REVIEW_TABLE } = require("../models/review.model");

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(MOVIE_TABLE, MovieSchema);
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.createTable(REVIEW_TABLE, ReviewSchema);
    await queryInterface.createTable(USER_TABLE,  {
      id:{
          primaryKey: true,
          autoIncrement: true,
          type: DataTypes.INTEGER(),
          unique: true
      },
      name: {
          type: DataTypes.STRING,
          allowNull: true,
      },
      email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false
      },
      img: {
          type: DataTypes.STRING,
          allowNull: true
      }
  });
  },

  async down (queryInterface) {
    await queryInterface.dropTable(MOVIE_TABLE);
    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.dropTable(REVIEW_TABLE);
    await queryInterface.dropTable(USER_TABLE);
  }
};
