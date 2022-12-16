const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const setupModels = require('./../db/models/index');

const user = encodeURIComponent(config.dbUser);
const pass = encodeURIComponent(config.dbPassword);
const host = config.dbHost
const port = config.dbPort;
const dbName = config.dbName;

const URI = `postgres://${user}:${pass}@${host}:${port}/${dbName}`;

const sequelize = new Sequelize(URI, {
        dialect: 'postgres',
        logging: false
    });

setupModels(sequelize);

module.exports = sequelize;


