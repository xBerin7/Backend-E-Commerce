const cart = require('express').Router()
const cartController = require('../controllers/cart.controller.js')
const passport = require('passport')


cart.post('/', passport.authenticate('jwt',{session:false}),cartController.getCart)
cart.put('/create',passport.authenticate('jwt',{session:false}),cartController.createCart)
cart.put('/add',passport.authenticate('jwt',{session:false}),cartController.updateCart)
cart.delete('/delete',passport.authenticate('jwt',{session:false}),cartController.deleteProductCart)

module.exports = cart