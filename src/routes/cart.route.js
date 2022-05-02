const cart = require('express').Router()
const cartController = require('../controllers/cart.controller.js')

cart.get('/', cartController.getCart)
cart.post('/add',cartController.updateCart)
cart.post('/delete',cartController.deleteProductCart)

module.exports = cart