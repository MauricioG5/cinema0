const { DataTypes, Model, Sequelize } = require('sequelize');

const GENRE_TABLE = 'genres';

const GenreSchema = {
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

class Genre extends Model{
    static associate(models) {
        this.belongsToMany(models.Movie, {
            as:'movies',
            through: models.MovieGenre,
            foreignKey: 'genreId',
            otherKey: 'movieId'
        });
    };

    static config(sequelize) {
       return {
            sequelize,
            tableName: GENRE_TABLE,
            modelName: 'Genre',
            timestamps: false
        }
    }
}

module.exports = { Genre, GenreSchema, GENRE_TABLE }