const sequelize = require('../sequelize')
const Sequelize = require('sequelize')

const Hero = sequelize.define('d2_hero', {
    uid: {
        type: Sequelize.STRING(32),
        primaryKey: true
    },
    name: Sequelize.STRING(30),
    setting: Sequelize.TEXT,
    avator: Sequelize.STRING(80),
    strong: Sequelize.STRING(10),
    agile: Sequelize.STRING(10),
    intelligence: Sequelize.STRING(10),
    attack: Sequelize.STRING(10),
    armor: Sequelize.STRING(10),
    speed: Sequelize.STRING(10),
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
}, {
    freezeTableName:true
});

module.exports = Hero