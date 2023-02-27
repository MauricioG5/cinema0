const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const setupModels = require('./../db/models/index');


let URI = ''
if (config.isProd) {
        URI = config.prodUrl
} else {
        URI = config.devUrl;
}

const options = {
        dialect: 'postgres',
        logging: config.isProd ? false : console.log
};
if (config.isProd) {
        options.dialectoptions = {
                ssl: {
                        rejectUnauthorized: false
                }
        }
}

const sequelize = new Sequelize(URI, options);

setupModels(sequelize);

module.exports = sequelize;


