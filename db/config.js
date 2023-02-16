const { config } = require('../config/config')

const user = encodeURIComponent(config.dbUser);
const pass = encodeURIComponent(config.dbPassword);
const host = config.dbHost
const port = config.dbPort;
const dbName = config.dbName;

const URI = `postgres://${user}:${pass}@${host}:${port}/${dbName}`;
// console.log('Mi URI es '+URI);
module.exports = {
    development: {
      url: URI,
      dialect: 'postgres'
    },
    production: {
      url: URI,
      dialect: 'postgres'
    }
  }