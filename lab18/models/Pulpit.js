const Sequelize = require('sequelize');
const sequelize = require('../config');

module.exports = sequelize.define("Pulpit",  {
    Pulpit: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    Pulpit_name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    Faculty: {
        type: Sequelize.STRING,
        allowNull: false
    },
});