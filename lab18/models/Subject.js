const Sequelize = require('sequelize');
const sequelize = require('../config');

module.exports = sequelize.define("Subject",  {
    Subject: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    Subject_name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    Pulpit: {
        type: Sequelize.STRING,
        allowNull: false
    },
});