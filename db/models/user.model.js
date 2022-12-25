const { DataTypes, Model, Sequelize } = require('sequelize');

USER_TABLE = 'users';

const UserSchema = {
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER(),
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'user'
    },
    img: {
        type: DataTypes.STRING,
        allowNull: true
    }
}

class User extends Model{

    static associate(){};

    static config(sequelize){
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'User',
            timestamps: false

        }
    };
}

module.exports = {USER_TABLE, UserSchema, User};