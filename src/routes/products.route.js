const products = require('express').Router()
const productsController = require('../controllers/product.controller.js')
const ValidateAdmin = require('../middleware/ValidateAdmin')

products.get('/', productsController.getAllProducts)
products.get('/:id', productsController.getProductById)
products.get('/category/:category',productsController.getProductByCategory)

//|----------------------------------|ADMIN|--------------------------------------//
products.post('/create',ValidateAdmin ,productsController.createProduct)
products.put('/edit/:id', ValidateAdmin,productsController.editProduct)
products.delete('/delete/:id', ValidateAdmin,productsController.deleteProduct)


module.exports = products
