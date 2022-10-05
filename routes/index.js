const express = require('express');
const moviesRouter = require('./movies.router');
const mainRouter = require('./main.router');

function appRouter(app){
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/', mainRouter);
    router.use('/movies', moviesRouter);
}

module.exports = appRouter;