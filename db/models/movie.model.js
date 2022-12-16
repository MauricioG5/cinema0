const { DataTypes, Model, Sequelize } = require('sequelize');

const MOVIE_TABLE = 'movies';

const MovieSchema = {
    id: {
        // allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    img: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
    },
    releaseYear: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'release-year'
    },
    categoryId: {
        allowNull: true,
        type: DataTypes.INTEGER,
        field: 'category-id'
    }
};

class Movie extends Model{
    static associate() {
    };
    static config(sequelize) {
       return {
            sequelize,
            tableName: MOVIE_TABLE,
            modelName: 'Movie',
            timestamps: false
        }
    }
}

module.exports = { Movie, MovieSchema, MOVIE_TABLE }