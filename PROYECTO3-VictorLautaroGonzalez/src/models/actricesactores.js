const { DataTypes } = require("sequelize");
const sequelize = require("../conection/connection");

const ActricesActores = sequelize.define(
  "ActricesActores",
  {
    IdActores: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "ActricesActores",
    timestamps: false,
  }
);

module.exports = ActricesActores;
