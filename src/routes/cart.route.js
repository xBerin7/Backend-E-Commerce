const cart = require('express').Router()
const cartController = require('../controllers/cart.controller.js')
const passport = require('passport')


cart.post('/', passport.authenticate('jwt',{session:false}),cartController.getCart)
cart.post('/create',passport.authenticate('jwt',{session:false}),cartController.createCart)
cart.post('/add',passport.authenticate('jwt',{session:false}),cartController.updateCart)
cart.post('/delete',passport.authenticate('jwt',{session:false}),cartController.deleteProductCart)

module.exports = cart