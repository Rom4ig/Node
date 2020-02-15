const Sequelize = require('sequelize');
const sequelize = require('../config');

module.exports = sequelize.define("Faculty",  {
    Faculty: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    Faculty_name: {
        type: Sequelize.STRING,
        allowNull: true
    }
});