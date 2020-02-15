const Sequelize = require('sequelize');
const sequelize = require('../config');

module.exports = sequelize.define("Teacher",  {
    Teacher: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    Teacher_name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    Pulpit: {
        type: Sequelize.STRING,
        allowNull: false
    },
});