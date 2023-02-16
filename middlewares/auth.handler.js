const boom = require('@hapi/boom');
const { config } = require('../config/config');

function apiKeyChecker(req, res, next) {
    const key = req.headers['api'];
    if (key === config.apiKey && typeof key != 'undefined') {
        next();
    } else {
        next(boom.unauthorized());
    }
}

function checkRoles(roles) {
    return (req, res, next) => {
        const role = req.user?.role ?? 'user';
        if (roles.includes(role)) {
            next()
        } else {
            next(boom.forbidden('Authorization needed'))
        }
    }
}

module.exports = { apiKeyChecker, checkRoles }