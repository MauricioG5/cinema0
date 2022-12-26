const { Movie, MovieSchema, MOVIE_TABLE } = require("./movie.model");
const { Category, CategorySchema, CATEGORY_TABLE } = require("./category.model");
const { User, UserSchema, USER_TABLE } = require("./user.model");
const { Review, ReviewSchema, REVIEW_TABLE } = require("./review.model");
const { Director, DirectorSchema, DIRECTOR_TABLE } = require("./director.model");



function setUpModels(sequelize){
    Movie.init(MovieSchema, Movie.config(sequelize));
    Category.init(CategorySchema, Category.config(sequelize));
    User.init(UserSchema, User.config(sequelize));
    Review.init(ReviewSchema, Review.config(sequelize));
    Review.init(DirectorSchema, Director.config(sequelize));
}

module.exports = setUpModels;