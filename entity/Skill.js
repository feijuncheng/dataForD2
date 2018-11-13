const sequelize = require('../sequelize')
const Sequelize = require('sequelize')

const Skill = sequelize.define('d2_skill', {
    uid: {
        type: Sequelize.STRING(32),
        primaryKey: true
    },
    hero_uid: Sequelize.STRING(32),
    name: Sequelize.STRING(30),
    img: Sequelize.STRING(80),
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
}, {
    freezeTableName:true
});

module.exports = Skill