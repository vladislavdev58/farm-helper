const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    title: {type: String, required: true},
    weight: {type: Number, required: true},
    cost: {type: Number, required: true},
    date: {type: Date, require: true},
    owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Poisons', schema)
