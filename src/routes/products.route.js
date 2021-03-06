const products = require('express').Router()
const productsController = require('../controllers/product.controller.js')
const ValidateAdmin = require('../middleware/ValidateAdmin')

products.get('/', productsController.getProduct)
products.get('/:id', productsController.getProductById)
products.get('/category/:category',productsController.getProductByCategory)
products.post('/create',ValidateAdmin ,productsController.createProduct)
products.put('/edit/:id', ValidateAdmin,productsController.editProduct)
products.delete('/delete/:id', ValidateAdmin,productsController.deleteProduct)


module.exports = products
