const { DataTypes, Model, Sequelize } = require('sequelize');

const ACTOR_TABLE = 'actors';

const ActorSchema = {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    lastName: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'last_name'
    },
    photo: {
        allowNull: true,
        type: DataTypes.STRING,
        unique: true
    }
}

class Actor extends Model {
    
    static config(sequelize){
        return {
            sequelize,
            modelName: 'Actor',
            tableName: 'actors',
            timestamps: false
        }
    }

    static associate(models){

    }
}

module.exports = { ACTOR_TABLE, ActorSchema , Actor}