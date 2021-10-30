const {Router} = require('express')
const Poisons = require('../models/Poisons')
const router = Router()
const auth = require('../moddleware/auth.moddleware')
const config = require('config')

router.put('/poisons', auth, async (req, res) => {
    try {
        const {name, weight, cost, date} = req.body
        const sum = cost * weight
        const poison = new Poisons({
            name, weight, cost, sum, date, owner: req.user.userId
        })
        await poison.save()
        res.status(201).json({poison})
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так'})
    }
})

router.get('/poisons', auth, async (req, res) => {
    try {
        const poisons = await Poisons.find({owner: req.user.userId})
        res.json(poisons)
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так'})
    }
})

module.exports = router
