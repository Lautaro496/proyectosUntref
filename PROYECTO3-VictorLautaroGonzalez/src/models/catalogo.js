const { DataTypes } = require('sequelize');
const sequelize = require('../conection/connection');

const Catalogo = sequelize.define('Catalogo', {
    idCatalogo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Poster: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Categoria: {
      type: DataTypes.STRING,
      allowNull: false,
    },  
    Genero: {
      type: DataTypes.STRING,
      default: false,
    },
    Resumen: {
      type: DataTypes.STRING,
      default: false,
    },
    Temporadas: {
      type: DataTypes.INTEGER,
      default: false,
    },
    Reparto: {
      type: DataTypes.STRING,
      default: false,
    },
    Trailer: {
      type: DataTypes.STRING,
      default: false,
    }
}, {
  tableName: 'Catalogo',
  timestamps: false,
});

module.exports = Catalogo;
