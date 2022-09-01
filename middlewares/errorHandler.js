function errorLogger (error, req, res, next){
    console.log(error.message)
    next(error);
}
function boomErrorHandler (error, req, res, next){
    if(error.isBoom){
        res.send('It is boom')
    }
    next(error);
}

function errorHandler (error, req, res, next){
    res.send('It is not boom')    
    next;
    // next(error);
}

module.exports = { errorLogger, boomErrorHandler, errorHandler };