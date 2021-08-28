const {Router} = require('express')
const Sale = require('../models/Sale')
const Corn = require('../models/Corn')
const router = Router()
const auth = require('../moddleware/auth.moddleware')
const {check, validationResult} = require("express-validator");

router.post(
    '/add',
    [
        check('_id', 'Выберите что продали').notEmpty(),
        check('weight', 'Объем должен быть больше нуля').isInt({min: 1}),
        check('date', 'Выберите дату').notEmpty(),
    ],
    auth,
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при регистрации'
                })
            }
            const {_id, date} = req.body
            const saleWeight = req.body.weight
            const corn = await Corn.findOne({_id})
            if (!corn) {
                return res.status(400).json({message: 'Не найдено'})
            }
            const {name, cost, weight} = corn
            if (saleWeight > weight) {
                return res.status(400).json({
                    message: `У Вас нет столько на складе.<br>Перепроверьте введенные данные или актуализируйте имеющиеся`
                })
            }
            const sum = cost * saleWeight
            const sale = new Sale({
                name, weight: saleWeight, sum, date, owner: req.user.userId
            })
            const newWeight = weight - saleWeight
            const updateCorn = await Corn.findByIdAndUpdate(_id, {weight: newWeight}, {new: true})
            await sale.save()
            const message = `${name} объемом ${saleWeight} продали на сумму ${sum}`
            res.status(201).json({message, sale, updateCorn})
        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так'})
        }
    })

router.get('/get', auth, async (req, res) => {
    try {
        const sale = await Sale.find({owner: req.user.userId})
        res.json(sale)
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так'})
    }
})

module.exports = router
