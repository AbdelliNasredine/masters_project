const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../database/connection");

const Parking = sequelize.define(
  "Parking",
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    rentPrice: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lat: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    lon: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    authorizedVehicles: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    parkingSpots: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    reservedSpots: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: "parking",
  }
);

module.exports = Parking;
