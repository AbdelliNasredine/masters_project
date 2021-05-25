const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../database/connection");

const PaymentStatus = sequelize.define(
  "PaymentStatus",
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
    tableName: "payment_status",
  }
);

module.exports = PaymentStatus;
