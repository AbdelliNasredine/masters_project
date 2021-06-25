const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../database/connection");

const Payment = sequelize.define(
  "Payment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "payment",
  }
);

Payment.belongsTo(sequelize.models.Reservation, {
  foreignKey: {
    name: "reservation_id",
  },
});

module.exports = Payment;
