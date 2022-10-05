const boom = require('@hapi/boom');

function validationHandler (schema, property) {
    return (req, res, next) => {
        const data = req[property];
        const { error } = schema.validate(data, { abortEarly: false});
        console.log('error: ');
        console.log(error);
        if(error) {
            next( boom.badRequest(error.message) )
        }
        next();
    }
}

module.exports = validationHandler