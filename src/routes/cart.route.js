const cart = require('express').Router()
const cartController = require('../controllers/cart.controller.js')
const ValidateToken = require('../middleware/ValidateToken')


cart.get('/', ValidateToken,cartController.getCart)
cart.post('/create',ValidateToken,cartController.createCart)
cart.post('/add',ValidateToken,cartController.updateCart)
cart.post('/delete',ValidateToken,cartController.deleteProductCart)

module.exports = cart