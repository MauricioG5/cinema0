const { DataTypes, Model, Sequelize} = require('sequelize');
const { CATEGORY_TABLE } = require("./category.model");
const { MOVIE_TABLE } = require("./movie.model");

const MOVIE_CATEGORY_TABLE = 'movies_categories';

const MovieCategorySchema = {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        unique: true
    },
    categoryId: {
        type: DataTypes.INTEGER,
        field: 'category_id',
        allowNull: false,
        references: {
            model: CATEGORY_TABLE,
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

class MovieCategory extends Model {
    static associate(models){
        }

    static config(sequelize){
        return {
            sequelize,
            tableName: MOVIE_CATEGORY_TABLE,
            modelName: 'MovieCategory',
            timestamps: false
        }
    }
}

module.exports = { MovieCategory , MOVIE_CATEGORY_TABLE, MovieCategorySchema};