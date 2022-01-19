const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')

const app = express()

app.use(express.json({extended: true}))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/tables', require('./routes/corn.routes'), require('./routes/poisons.routes'), require('./routes/sale.routes'))

// if (process.env.NODE_ENV === 'production') {
//     app.use('/', express.static(path.join(__dirname, 'client', 'build')))
//
//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//     })
// }

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
