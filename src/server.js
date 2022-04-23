const express = require('express')
const { json } = require('express')
const morgan = require('morgan')
const ValidateToken = require('./middleware/ValidateToken.js')

const server = express()
server.name = 'API-ECOMM'

server.use(json({ limit: '50mb' }))
server.use(morgan('dev'))
server.use('/', require('./routes/index.route.js'))
server.use('/user/:id', ValidateToken, require('./routes/index.route.js'))

// Endware
server.use((err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || err
  console.error(err)
  res.status(status).send(message)
})

module.exports = server
