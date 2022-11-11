const { DataTypes } = require('sequelize');

module.exports = (instance) => {
    return instance.define('user', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
        }
    }, {
        timestamps: false
    });
}