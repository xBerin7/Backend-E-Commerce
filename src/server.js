const express = require('express')
const { json } = require('express')


const server = express()

server.name = 'API-ECOMM'

server.use(json({ limit: '50mb' }))


server.use('/', require('./routes/index.route.js'))

server.use((err, req, res, next) => {
    const status = err.status || 500
    const message = err.message || err
    console.error(err)
    res.status(status).send(message)
})

module.exports = server


