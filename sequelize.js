const mysql = require('mysql')
const Sequelize = require('sequelize')

const sequelize = new Sequelize('dota2', 'root', '123', {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    timestamps: false
});

module.exports = sequelize