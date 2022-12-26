const { DataTypes, Model, Sequelize } = require('sequelize');

DIRECTOR_TABLE = 'directors';

const DirectorSchema = {
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER(),
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'last_name',
    },
    photo: {
        allowNull:true,
        type: DataTypes.STRING,
        unique: true
    }
}

class Director extends Model{

    static associate(){};

    static config(sequelize){
        return {
            sequelize,
            tableName: DIRECTOR_TABLE,
            modelName: 'Director',
            timestamps: false

        }
    };
}

module.exports = {DIRECTOR_TABLE, DirectorSchema, Director};