const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sensors', 'user', 'pass', {
    dialect: 'sqlite',
    host: './database.sqlite'
});

module.exports = sequelize;