const { Category, CategorySchema, CATEGORY_TABLE } = require("./category.model");
const { Movie, MovieSchema, MOVIE_TABLE } = require("./movie.model");
const { User, UserSchema, USER_TABLE } = require("./user.model");
const { Review, ReviewSchema, REVIEW_TABLE } = require("./review.model");
const { Director, DirectorSchema, DIRECTOR_TABLE } = require("./director.model");
const { ACTOR_TABLE, ActorSchema , Actor} = require("./actor.model");
const { DISTRIBUTION_TABLE, DistributionSchema, Distribution} = require("./distribution.model");



function setUpModels(sequelize){

    Actor.init(ActorSchema, Actor.config(sequelize));
    Category.init(CategorySchema, Category.config(sequelize));
    Director.init(DirectorSchema, Director.config(sequelize));
    Movie.init(MovieSchema, Movie.config(sequelize));
    Distribution.init(DistributionSchema, Distribution.config(sequelize));
    User.init(UserSchema, User.config(sequelize));
    Review.init(ReviewSchema, Review.config(sequelize));

    Category.associate(sequelize.models);
    Director.associate(sequelize.models);
    Actor.associate(sequelize.models);
    Movie.associate(sequelize.models);
    Distribution.associate(sequelize.models);
    Review.associate(sequelize.models);
    User.associate(sequelize.models);
} 

module.exports = setUpModels;