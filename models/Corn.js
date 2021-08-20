const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true},
    weight: {type: Number, required: true},
    cost: {type: Number, required: true},
    color: [String],
    owner: {type: Types.ObjectId, ref: 'User'}

})

module.exports = model('Corn', schema)
