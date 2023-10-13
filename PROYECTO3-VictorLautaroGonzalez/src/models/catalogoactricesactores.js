const { DataTypes } = require('sequelize');
const sequelize = require('../conection/connection');

const CatalogoActricesActores = sequelize.define('CatalogoActricesActores', {
    idCatAct: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idCatalogo: {
        type: DataTypes.INTEGER,
        default: 1
    },
    idActores: {
        type: DataTypes.INTEGER,
        default: 1
    }
}, {
  tableName: 'CatalogoActricesActores',
  timestamps: false,
});


module.exports = CatalogoActricesActores;