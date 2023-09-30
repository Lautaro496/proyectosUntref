const { DataTypes } = require('sequelize');
const sequelize = require('../conection/connection');

const Genero = sequelize.define('Genero', {
    IdGenero: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
}, {
  tableName: 'Genero',
  timestamps: false,
});

module.exports = Genero;