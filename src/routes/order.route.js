const order = require('express').Router()
const validateAdmin = require('../middleware/ValidateAdmin')
const {createOrder}=require('../controllers/order.controller') 

order.post('/createOrder',validateAdmin,createOrder)


module.exports=order