const { DataTypes, Model, Sequelize} = require('sequelize');
const { USER_TABLE } = require("./user.model");
const { MOVIE_TABLE } = require("./movie.model");

REVIEW_TABLE = 'reviews';

const ReviewSchema = {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        unique: true
    },
    userId: {
        type: DataTypes.INTEGER,
        field: 'user_id',
        allowNull: false,
        references: {
            model: USER_TABLE,
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
        },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    review: {
        type: DataTypes.STRING,
        allowNull: false
    }
}

class Review extends Model {
    static associate(models){
        this.belongsTo(models.User,  { as: 'user' });
        this.belongsTo(models.Movie, { as: 'movie'});
    }

    static config(sequelize){
        return {
            sequelize,
            tableName: REVIEW_TABLE,
            modelName: 'Review',
            timestamps: false
        }
    }
}

module.exports = { ReviewSchema, REVIEW_TABLE, Review};