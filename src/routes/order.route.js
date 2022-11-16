const order = require('express').Router()
const validateAdmin = require('../middleware/ValidateAdmin')
const {createOrder,updateOrder}=require('../controllers/order.controller') 

order.post('/createOrder',validateAdmin,createOrder)
order.put('/update',validateAdmin,updateOrder)


module.exports=order