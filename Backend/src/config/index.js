const dotenv = require('dotenv')
dotenv.config()

const JWT_TOKEN = process.env.JWT_TOKEN;
const JWT_EXPIRE_IN = process.env.JWT_EXPIRE_IN;
const DB_URL = process.env.DB_URL
module.exports = { JWT_TOKEN, JWT_EXPIRE_IN, DB_URL };
