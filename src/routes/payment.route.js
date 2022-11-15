const payment = require('express').Router()
const paymentController = require('../controllers/payment.controller.js')
const passport = require('passport')
const {createOrder,captureOrder}= require('../controllers/payment.controller')

payment.post('/createOrder',passport.authenticate('jwt',{session:false}),createOrder)
payment.get('/captureOrder',passport.authenticate('jwt',{session:false}),captureOrder)

module.exports = payment
