const {Router} = require('express')
const Corn = require('../models/Corn')
const router = Router()
const auth = require('../moddleware/auth.moddleware')
const config = require('config')
const randomcolor = require('randomcolor')

router.post('/addCorn', auth, async (req, res) => {
    try {
        const {name, weight, cost} = req.body
        const color = randomcolor({count: 2})
        const corn = new Corn({
            name, weight, cost, color ,owner: req.user.userId
        })
        await corn.save()
        res.status(201).json({corn})
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так'})
    }
})

router.get('/getList', auth, async (req, res) => {
    try {
        const corn = await Corn.find({owner: req.user.userId})
        res.json(corn)
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так'})
    }
})

router.post('/edit', auth, async (req, res) => {
    try {
        const {_id, name, weight, cost} = req.body
        const corn = await Corn.findByIdAndUpdate(_id, {name, weight, cost})
        res.status(201).json({message: `${name} - изменено!`})
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так'})
    }
})

module.exports = router
