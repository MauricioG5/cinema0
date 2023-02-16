'use strict';

const { DataTypes } = require('sequelize');
const { Movie, MovieSchema, MOVIE_TABLE } = require('../models/movie.model');
const { Genre, GenreSchema, GENRE_TABLE } = require('../models/genre.model');
const { User, UserSchema, USER_TABLE } = require('../models/user.model');
const { Review, ReviewSchema, REVIEW_TABLE } = require("../models/review.model");
const { Director, DirectorSchema, DIRECTOR_TABLE } = require("../models/director.model");
const { Actor, ActorSchema, ACTOR_TABLE } = require("../models/actor.model");
const { Distribution, DistributionSchema, DISTRIBUTION_TABLE } = require("../models/distribution.model");
const { MovieGenre, MovieGenreSchema, MOVIE_GENRE_TABLE} = require("../models/movie-genre.model");

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(GENRE_TABLE, GenreSchema);
    await queryInterface.createTable(ACTOR_TABLE, ActorSchema);
    await queryInterface.createTable(DIRECTOR_TABLE, DirectorSchema);
    await queryInterface.createTable(MOVIE_TABLE, MovieSchema);
    await queryInterface.createTable(DISTRIBUTION_TABLE, DistributionSchema);
    await queryInterface.createTable(MOVIE_GENRE_TABLE, MovieGenreSchema);
    await queryInterface.createTable(USER_TABLE,  {
      id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
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
      recoveryToken: {
        field: 'recovery_token',
        allowNull: true,
        type: DataTypes.STRING
    },
      img: {
        type: DataTypes.STRING,
        allowNull: true
      }
    });
    await queryInterface.createTable(REVIEW_TABLE, ReviewSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(MOVIE_GENRE_TABLE);
    await queryInterface.dropTable(DISTRIBUTION_TABLE);
    await queryInterface.dropTable(REVIEW_TABLE);
    await queryInterface.dropTable(ACTOR_TABLE);
    await queryInterface.dropTable(MOVIE_TABLE);
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(GENRE_TABLE);
    await queryInterface.dropTable(DIRECTOR_TABLE);
  }
};
