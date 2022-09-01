const dotEnv = require('dotenv');

dotEnv.config();

module.exports = {
    env: process.env.env || 'dev',
    port: process.env.PORT || 3000,
    dbName: process.env.DB_NAME,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT
}