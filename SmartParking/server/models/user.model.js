const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../database/connection");
const bcrypt = require("bcrypt");

// model
class User extends Model {
  verifyPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
}

//initialization
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { sequelize, modelName: "User", tableName: "user" }
);

// hooks
User.beforeCreate(function (user, _) {
  user.password = bcrypt.hashSync(user.password, 10);
});

module.exports = User;
