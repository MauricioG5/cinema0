require('dotenv').config();

// console.log('uploading env variables')
const config = {
    env: process.env.NODE_ENV || 'dev',
    isProd: process.env.NODE_ENV ==='production',
    port: process.env.PORT || 3000,
    dbName: process.env.DB_NAME,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    devUrl: process.env.DEV_URL,
    prodUrl: process.env.PROD_URL,
    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET,
    mailSender: process.env.MAIL_SENDER,
    mailSenderPass: process.env.MAIL_SENDER_PASS,
    rootPassword: process.env.ROOT_PASSWORD,
}

module.exports = { config }