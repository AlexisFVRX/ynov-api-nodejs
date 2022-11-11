const { Sequelize } = require('sequelize');
const dbConfig = require('../db.config');

// MYSQL :
/*const instance = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
        host: dbConfig.hostname,
        dialect: "mysql"
});*/

// SQLITE :
const instance = new Sequelize({
    dialect: dbConfig.dialect,
    storage: dbConfig.storage
});

module.exports = {
    instance,
    users: require('./users')(instance),
    books: require('./books')(instance),
    reviews: require('./reviews')(instance)
};

// Define associations between models
instance.models.review.belongsTo(instance.models.user);
instance.models.review.belongsTo(instance.models.book);