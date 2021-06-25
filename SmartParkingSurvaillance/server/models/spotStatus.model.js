const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../database/connection");

const SpotStatus = sequelize.define(
  "SpotStatus",
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
    tableName: "spot_status",
  }
);

module.exports = SpotStatus;
