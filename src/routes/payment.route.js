const payment = require('express').Router()
const paymentController = require('../controllers/payment.controller.js')
const ValidateToken = require('../middleware/ValidateToken')

payment.post('/createOrder',ValidateToken,paymentController.createOrder)
payment.get('/captureOrder',ValidateToken,paymentController.captureOrder)
//payment.post('/cancelOrder',ValidateToken,paymentController.cancelOrder)

module.exports = payment
