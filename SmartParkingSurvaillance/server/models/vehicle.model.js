const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../database/connection");

const Vehicle = sequelize.define(
  "Vehicle",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    licencePlate: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "vehicle",
  }
);

Vehicle.belongsTo(sequelize.models.Driver, {
  foreignKey: {
    name: "driver_id",
  },
});

module.exports = Vehicle;
