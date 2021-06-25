const config = require("../config");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.pass,
  {
    port: config.db.port,
    dialect: config.db.dialect,
  }
);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

module.exports = { sequelize, testConnection };
