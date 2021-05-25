const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../database/connection");
// const User = require("./user.model");

const Driver = sequelize.define(
  "Driver",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balance: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "driver",
  }
);

Driver.belongsTo(User, {
  foreignKey: {
    name: "user_id",
  },
});

Driver.hasOne(sequelize.models.Vehicle);

Driver.belongsToMany(sequelize.models.Spot, {
  through: sequelize.models.Reservation,
  uniqueKey: "driver_id",
});

module.exports = Driver;
