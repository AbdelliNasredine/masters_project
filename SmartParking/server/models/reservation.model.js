const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../database/connection");

const Reservation = sequelize.define(
  "Reservation",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "reservation",
  }
);

Reservation.hasOne(sequelize.models.Payment);

module.exports = Reservation;
