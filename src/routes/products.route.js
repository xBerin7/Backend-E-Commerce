const products = require('express').Router()
const productsController = require('../controllers/product.controller.js')

products.get('/', productsController.getProduct)
products.get('/:id', productsController.getProductById)
products.post('/create', productsController.createProduct)
products.put('/edit/:id', productsController.editProduct)


module.exports = products
