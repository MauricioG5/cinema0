const { config } = require('../config/config')

const user = encodeURIComponent(config.dbUser);
const pass = encodeURIComponent(config.dbPassword);
const host = config.dbHost
const port = config.dbPort;
const dbName = config.dbName;

const URI = `postgres://${user}:${pass}@${host}:${port}/${dbName}`;

module.exports = {
  development: {
    url: config.devUrl,
    dialect: 'postgres'
  },
  production: {
    url: config.prodUrl,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  }
}