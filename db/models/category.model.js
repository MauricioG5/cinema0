const { DataTypes, Model, Sequelize } = require('sequelize');

const CATEGORY_TABLE = 'categories';

const CategorySchema = {
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
    }
};

class Category extends Model{
    static associate(models) {
        this.belongsToMany(models.Movie, {
            as:'movies',
            through: models.MovieCategory,
            foreignKey: 'categoryId',
            otherKey: 'movieId'
        });
    };

    static config(sequelize) {
       return {
            sequelize,
            tableName: CATEGORY_TABLE,
            modelName: 'Category',
            timestamps: false
        }
    }
}

module.exports = { Category, CategorySchema, CATEGORY_TABLE }