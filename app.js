const express = require('express')
const app = express()
const url = require('url'); //解析操作url
const superagent = require('superagent')
const cheerio = require('cheerio')
const eventproxy = require('eventproxy')
const targetUrl = 'https://www.dota2.com.cn/hero/'
const {heroDao, skillDao, talentDao} = require('./dao')
const sequelize = require('./sequelize')

// app.get('/', (req, res) => res.send('Hello World!'))
let heroes = []
superagent.get('https://www.dota2.com.cn/heroes/index.htm')
    .end(async function (err, res) {
        const $ = cheerio.load(res.text)
        $('.heroPickerIconLink').each((i, v) => {
            let href = $(v).attr('href')
            const heroName = href.match(/hero\/([\s\S]*)\//)[1]
            heroes.push(heroName)
        })
        // 清空数据
        await sequelize.truncate()
        heroes.forEach(v => {
            addHeroes(v)
        })
    });

function addHeroes (v) {
    superagent.get(targetUrl + v)
        .end(async function (err, res) {
            const HD = cheerio.load(res.text)
            let entity = {}
            let icon = HD('.hero_info .hero_b').attr('src') // 头像
            let name = HD('.hero_name').text().trim()
            let setting = HD('.story_box').text().trim() // 故事背景
            let attribute = {
                strong: HD('.property_box li').eq(0).text().trim().match(/([0-9]+[\s\S]?\+[\s\S]?[0-9.]+)/)[0],
                agile: HD('.property_box li').eq(1).text().trim().match(/([0-9]+[\s\S]?\+[\s\S]?[0-9.]+)/)[0],
                intelligence: HD('.property_box li').eq(2).text().trim().match(/([0-9]+[\s\S]?\+[\s\S]?[0-9.]+)/)[0],
                attack: HD('.property_box li').eq(3).text().trim().match(/([0-9.]+)/)[0],
                armor: HD('.property_box li').eq(4).text().trim().match(/([0-9.]+)/)[0],
                speed: HD('.property_box li').eq(5).text().trim().match(/([0-9.]+)/)[0]
            } // 属性
            let skill = []
            HD('.skill_wrap').each((v, item) => {
                skill.push({
                    img: HD(item).children('.skill_b').attr('src'),
                    name: HD('.skill_intro').eq(v).children('span').text()
                })
            }) // 技能
            let talent = []
            HD('.talent_ul li').each((v, item) => {
                talent.push({
                    t_left: HD(item).children('.talent-explain').eq(0).text(),
                    level: HD(item).children('.level-external').children('.level-interior').text(),
                    t_right: HD(item).children('.talent-explain').eq(1).text()
                })
            })
            let hero = await heroDao.createHero({
                name: name,
                setting: setting,
                avator: icon,
                ...attribute
            })
            skill.forEach(v => {
                console.log(v)
                skillDao.createSkill({
                    hero_uid: hero.uid,
                    ...v
                })
            })
            talent.forEach(v => {
                talentDao.createTalent({
                    hero_uid: hero.uid,
                    ...v
                })
            })
        });
}

app.listen(3000, () => console.log('start learning'))