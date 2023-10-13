const { DataTypes } = require("sequelize");
const sequelize = require("../conection/connection");

const CatalogoGenero = sequelize.define(
  "CatalogoGenero",
  {
    idCatGen: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idCatalogo: {
      type: DataTypes.INTEGER,
      default: 1,
    },
    idGenero: {
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
