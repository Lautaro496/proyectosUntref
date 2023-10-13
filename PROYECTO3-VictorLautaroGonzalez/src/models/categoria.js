const { DataTypes } = require('sequelize');
const sequelize = require('../conection/connection');

const Categoria = sequelize.define('Categoria', {
    idCategoria: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
}, {
  tableName: 'Categoria',
  timestamps: false,
});

module.exports = Categoria;