const { DataTypes, Model, Sequelize} = require('sequelize');

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
        field: 'user-id',
        allowNull: false
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
    static associate(){}

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