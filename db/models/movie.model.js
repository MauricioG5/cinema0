const { DataTypes, Model, Sequelize } = require('sequelize');
const { GENRE_TABLE } = require('./genre.model');
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
    minAge: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'min_age'
    },
    sinopsis: {
        type: DataTypes.TEXT,
        allowNull: true,
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
        this.belongsTo(models.Director, {as: 'director'});
        this.hasMany(models.Review, { 
            as: 'reviews',
            foreignKey: 'movieId'
        });
        this.belongsToMany(models.Actor, {
            as: 'actors',
            through: models.Distribution,
            foreignKey: 'movieId',
            otherKey: 'actorId'
        });
        this.belongsToMany(models.Genre, {
            as: 'genres',
            through: models.MovieGenre,
            foreignKey: 'movieId',
            otherKey: 'genreId'
        });
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