const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

app.use(express.json({extended: true}))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/poisons', require('./routes/poisons.routes'))
app.use('/api/corn', require('./routes/corn.routes'))

const PORT = config.get('port') || 5000
const MONGOURL = config.get('mongoUrl')

start = async () => {
    try {
        await mongoose.connect(MONGOURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`Hacking start on port ${PORT}...`))
    } catch (e) {
        console.error('Server error', e.message)
        process.exit(1)
    }
}


start()
