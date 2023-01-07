const { DataTypes, Model, Sequelize} = require('sequelize');
const { ACTOR_TABLE } = require("./actor.model");
const { MOVIE_TABLE } = require("./movie.model");

const DISTRIBUTION_TABLE = 'distribution';

const DistributionSchema = {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        unique: true
    },
    actorId: {
        type: DataTypes.INTEGER,
        field: 'actor_id',
        allowNull: false,
        references: {
            model: ACTOR_TABLE,
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
    characterName: {
        allowNull: false,
        field: 'character_name',
        type: DataTypes.STRING
    }
}

class Distribution extends Model {
    static associate(models){
        }

    static config(sequelize){
        return {
            sequelize,
            tableName: DISTRIBUTION_TABLE,
            modelName: 'Distribution',
            timestamps: false
        }
    }
}

module.exports = { DistributionSchema, DISTRIBUTION_TABLE, Distribution};