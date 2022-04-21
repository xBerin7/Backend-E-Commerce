const express = require('express')
const { json } = require('express')
const morgan = require('morgan')

const server = express()
server.name = 'API-ECOMM'

server.use(json({ limit: '50mb' }))
server.use(morgan('dev'))
server.use('/', require('./routes/index.route.js'))
server.use('/user', require('./routes/Register.route.js'))

server.use((err, req, res, next) => {
    const status = err.status || 500
    const message = err.message || err
    console.error(err)
    res.status(status).send(message)
})

module.exports = server


