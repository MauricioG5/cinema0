const express = require('express');
const moviesRouter = require('./movies.router');
const genresRouter = require('./genres.router');
const usersRouter = require('./users.router');
const reviewsRouter = require('./reviews.router');
const directorsRouter = require('./directors.router');
const actorsRouter = require('./actors.router');
const authRouter = require('./auth.router');

function appRouter(app){
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/movies', moviesRouter);
    router.use('/genres', genresRouter);
    router.use('/users', usersRouter);
    router.use('/reviews', reviewsRouter);
    router.use('/directors', directorsRouter);
    router.use('/actors', actorsRouter);
    router.use('/auth', authRouter);
}

module.exports = appRouter;