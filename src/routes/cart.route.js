const cart = require('express').Router()
const cartController = require('../controllers/cart.controller.js')

cart.get('/', cartController.getCart)
cart.post('/add',cartController.updateCart)

module.exports = cart