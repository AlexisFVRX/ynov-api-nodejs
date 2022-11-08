const { Sequelize } = require('sequelize');
const dbConfig = require('../db.config');

// MYSQL :
/*const instance = new Sequelize(dbConfig.database, dbConfig.username,
    dbConfig.password, {
        host: dbConfig.hostname,
        dialect: "mysql"
    });*/

// SQLITE3 :
const instance = new Sequelize({
    dialect: "sqlite",
    storage: "./my-db.sqlite"
});

module.exports = {
    instance,
    users: require('./users')(instance)
};