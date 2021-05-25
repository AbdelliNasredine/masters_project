const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../database/connection");

const Role = sequelize.define(
  "Role",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "role",
  }
);

module.exports = Role;
