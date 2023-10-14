const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DB_USER, process.env.PASSWORD, 
{
  host: process.env.HOST,
  dialect: 'mysql',
});

module.exports = sequelize;