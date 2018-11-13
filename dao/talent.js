const Talent = require('../entity/Talent')
const uuid = require('node-uuid')
createTalent = async (obj) => {
    let talent = await Talent.create({...obj, uid: uuid.v1()})
    // console.log('created:' + JSON.stringify(talent))
}

module.exports = {createTalent}