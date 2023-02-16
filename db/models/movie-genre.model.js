const { DataTypes, Model, Sequelize} = require('sequelize');
const { GENRE_TABLE } = require("./genre.model");
const { MOVIE_TABLE } = require("./movie.model");

const MOVIE_GENRE_TABLE = 'movies_genres';

const MovieGenreSchema = {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        unique: true
    },
    genreId: {
        type: DataTypes.INTEGER,
        field: 'genre_id',
        allowNull: false,
        references: {
            model: GENRE_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    movieId: {
        allowNull:false,
        type: DataTypes.INTEGER,
        field: 'movie_id',
        references: {
            model: MOVIE_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
        }
}

class MovieGenre extends Model {
    static associate(models){
        }

    static config(sequelize){
        return {
            sequelize,
            tableName: MOVIE_GENRE_TABLE,
            modelName: 'MovieGenre',
            timestamps: false
        }
    }
}

module.exports = { MovieGenre , MOVIE_GENRE_TABLE, MovieGenreSchema};