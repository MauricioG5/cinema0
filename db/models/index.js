const { Category, CategorySchema, CATEGORY_TABLE } = require("./category.model");
const { Movie, MovieSchema, MOVIE_TABLE } = require("./movie.model");
const { User, UserSchema, USER_TABLE } = require("./user.model");
const { Review, ReviewSchema, REVIEW_TABLE } = require("./review.model");
const { Director, DirectorSchema, DIRECTOR_TABLE } = require("./director.model");
const { Actor, ActorSchema , ACTOR_TABLE} = require("./actor.model");
const { Distribution, DistributionSchema, DISTRIBUTION_TABLE} = require("./distribution.model");
const { MovieCategory, MovieCategorySchema, MOVIE_CATEGORY_TABLE} = require("./movie-category.model");

function setUpModels(sequelize){

    Actor.init(ActorSchema, Actor.config(sequelize));
    Category.init(CategorySchema, Category.config(sequelize));
    Director.init(DirectorSchema, Director.config(sequelize));
    User.init(UserSchema, User.config(sequelize));
    Movie.init(MovieSchema, Movie.config(sequelize));
    Distribution.init(DistributionSchema, Distribution.config(sequelize));
    Review.init(ReviewSchema, Review.config(sequelize));
    MovieCategory.init(MovieCategorySchema, MovieCategory.config(sequelize));

    Category.associate(sequelize.models);
    Director.associate(sequelize.models);
    Actor.associate(sequelize.models);
    Movie.associate(sequelize.models);
    Review.associate(sequelize.models);
    User.associate(sequelize.models);
} 

module.exports = setUpModels;