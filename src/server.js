const express = require('express')
const { json } = require('express')
const morgan = require('morgan')
const cors = require('cors')
const MongoStore = require('connect-mongo');
const passport = require('passport')
const session = require('express-session')
const ValidatePassport = require('./middleware/ValidatePassport')

const server = express()
server.name = 'API-ECOMM'
server.use(cors({
  origin:'*'
  //origin: 'http://localhost:3000'
}));

server.use(
  session({
    secret:process.env.API_SECRET,
    resave:true,
    saveUninitialized:true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
  })
)
/*/session({
  secret:process.env.API_SECRET,
  resave:true,
  saveUninitialized:true,
  store:MongoStore.create({ mongoUrl: process.env.DB_URI }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 ,httpOnly:true}
})/*/
server.use(passport.initialize())
server.use(passport.session())
server.use(json({ limit: '50mb' }))
server.use(morgan('dev'))
server.use(passport.initialize())
server.use('/', require('./routes/index.route.js'))
server.use('/user/:id',require('./routes/index.route.js'))

// Endware
server.use((err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || err
  console.error(err)
  res.status(status).send(message)
})

module.exports = server
