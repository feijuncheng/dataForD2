const Skill = require('../entity/Skill')
const uuid = require('node-uuid')
createSkill = async (obj) => {
    let skill = await Skill.create({...obj, uid: uuid.v1()})
    // console.log('created:' + JSON.stringify(skill))
}

module.exports = {createSkill}