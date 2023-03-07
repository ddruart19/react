//import env var from .env file if not in production
// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config();
//   }

const db = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PWD,
    port: process.env.DB_PORT
}

module.exports = db