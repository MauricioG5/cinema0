const { DataTypes, Model } = require('sequelize');

const MOVIE_TABLE = 'movies';

const movieSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.NUMBER,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    year: {
        type: DataTypes.NUMBER,
        allowNull: true,
    }
}

class Movie extends Model{
    static associate() {
    }
    static config() {
    }
}

module.exports = { Movie, movieSchema, MOVIE_TABLE }