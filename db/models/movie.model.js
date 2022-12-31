const { DataTypes, Model, Sequelize } = require('sequelize');
const { CATEGORY_TABLE } = require('./category.model');
const { DIRECTOR_TABLE } = require('./director.model');

const MOVIE_TABLE = 'movies';

const MovieSchema = {
    id: {
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
        field: 'release_year'
    },
    categoryId: {
        allowNull: true,
        type: DataTypes.INTEGER,
        field: 'category_id',
        references: {
            model: CATEGORY_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    directorId: {
        allowNull: true,
        type: DataTypes.INTEGER,
        field: 'director_id',
        references: {
            model: DIRECTOR_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
};

class Movie extends Model {
    static associate(models) {
            this.belongsTo(models.Category, {as: 'category'})
            this.belongsTo(models.Director, {as: 'director'})
            this.hasMany(models.Review, { 
                as: 'reviews',
                foreignKey: 'movieId'
            })
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