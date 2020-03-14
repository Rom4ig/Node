const Sequelize = require("sequelize");
module.exports = new Sequelize("databasename", "user", "password", {
    dialect: "mssql",
    host: "localhost",
    define: {
        timestamps: false
    },
    port: port
});
