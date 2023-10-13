const { DataTypes } = require("sequelize");
const sequelize = require("../conection/connection");
const catalogo =require("./catalogo");
const categoria = require("./categoria");

const CatalogoCategoria = sequelize.define(
  "CatalogoCategoria",
  {
    idCatCateg: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    IdCatalogo: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    IdCategoria: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    }
  },
  {
    tableName: "CatalogoCategoria",
    timestamps: false,
  }
);
module.exports = CatalogoCategoria;
