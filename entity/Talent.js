const sequelize = require('../sequelize')
const Sequelize = require('sequelize')

const Skill = sequelize.define('d2_talent', {
    uid: {
        type: Sequelize.STRING(32),
        primaryKey: true
    },
    hero_uid: Sequelize.STRING(32),
    level: Sequelize.INTEGER,
    t_left: Sequelize.STRING(30),
    t_right: Sequelize.STRING(30),
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
}, {
    freezeTableName:true
});

module.exports = Skill