const { DataTypes } = require("sequelize");
const sequelize = require("../conection/connection");

const CatalogoGenero = sequelize.define(
  "CatalogoGenero",
  {
    IdCatGen: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    IdCatalogo: {
      type: DataTypes.INTEGER,
      default: 1,
    },
    IdGenero: {
      type: DataTypes.INTEGER,
      default: 1,
    }
  },
  {
    tableName: "CatalogoGenero",
    timestamps: false,
  }
);

module.exports = CatalogoGenero;
