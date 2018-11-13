const Hero = require('../entity/Hero')
const uuid = require('node-uuid')
createHero = async (obj) => {
    let hero = await Hero.create({...obj, uid: uuid.v1()})
    return hero
}

module.exports = {createHero}