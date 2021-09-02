const { Model, DataTypes } = require('sequelize');
const sequelize = require('./config/db-config');

class Sensor extends Model { }

Sensor.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    parametersData: {
        type: DataTypes.STRING,
        defaultValue: JSON.stringify([])
    }
}, {
    sequelize,
    modelName: 'sensor'
});

module.exports = Sensor;