const { config } = require('../config/config')

const user = encodeURIComponent(config.dbUser);
const pass = encodeURIComponent(config.dbPassword);
const host = config.dbHost
const port = config.dbPort;
const dbName = config.dbName;

const URI = `postgres://${user}:${pass}@${host}:${port}/${dbName}`;

module.exports = {
    development: {
      url: URI,
      dialect: 'postgres'
    },
    production: {
      url: config.extProdURL,
      dialect: 'postgres'
    }
  }