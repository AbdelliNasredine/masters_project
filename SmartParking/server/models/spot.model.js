const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../database/connection");
const Parking = require("./parking.model");

const Spot = sequelize.define(
  "Spot",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    slotNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    parking_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "spot",
  }
);

// Spot.belongsTo(Parking);

// Driver.belongsToMany(sequelize.models.Driver, {
//   through: sequelize.models.Reservation,
//   uniqueKey: "spot_id",
// });

module.exports = Spot;
