const Sequelize = require("sequelize");
module.exports = new Sequelize("labSequelize", "sa", "kTlTyTw@2014", {
    dialect: "mssql",
    host: "localhost",
    define: {
        timestamps: false
    },
    port: 61792
});