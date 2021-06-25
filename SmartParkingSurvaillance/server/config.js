require("dotenv").config();

module.exports = {
  web: {
    port: process.env.PORT,
    sessionSecret: process.env.SESSION_SECRET,
  },
  db: {
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
  },
  auth: {
    tokenSecret: process.env.ACCESS_TOKEN_SECRET,
  },
};
