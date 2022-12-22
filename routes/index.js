const express = require('express');
const moviesRouter = require('./movies.router');
const categoriesRouter = require('./categories.router');
const usersRouter = require('./users.router');
const reviewsRouter = require('./reviews.router');

function appRouter(app){
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/movies', moviesRouter);
    router.use('/categories', categoriesRouter);
    router.use('/users', usersRouter);
    router.use('/reviews', reviewsRouter);
}

module.exports = appRouter;