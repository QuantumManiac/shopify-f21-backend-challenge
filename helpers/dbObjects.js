// Intialization for ORM
const Sequelize = require('sequelize');

// Init Sqlite DB connection
const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite',
});

// Create table models
const Images = require('../models/Images')(sequelize, Sequelize.DataTypes);
const Users = require('../models/Users')(sequelize, Sequelize.DataTypes);

module.exports = { sequelize, Images, Users };
