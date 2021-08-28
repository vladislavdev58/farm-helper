const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true},
    weight: {type: Number, required: true},
    sum: {type: Number, required: true},
    date: {type: Date, require: true},
    owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Sale', schema)
