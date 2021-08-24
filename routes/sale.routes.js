const {Router} = require('express')
const Corn = require('../models/Sale')
const router = Router()
const auth = require('../moddleware/auth.moddleware')
const config = require('config')
const randomcolor = require('randomcolor')

router.post('/add', auth, async (req, res) => {
    try {
        const {name, weight, date} = req.body
        console.log(req.body)
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так'})
    }
})

module.exports = router
