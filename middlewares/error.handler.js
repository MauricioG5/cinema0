const { ValidationError } = require('sequelize');

function errorLogger (error, req, res, next){
    next(error);
}
function boomErrorHandler (error, req, res, next){
    if(error.isBoom){
        res.json( error )
    } else{
        next(error);
    }
}

function ormErrorHandler(error, req, res, next) {
    if (error instanceof ValidationError) {
        res.status(409).json({
            statusCode: 409,
            message: error.name,
            errors: error.errors
        });
    } else {

        next(error);
    }
}

function errorHandler (error, req, res, next){
    res.status(500).json({
        message: error.message,
        stack: error.stack
    });
}

module.exports = { errorLogger, boomErrorHandler, errorHandler, ormErrorHandler };