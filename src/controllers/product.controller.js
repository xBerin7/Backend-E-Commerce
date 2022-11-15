const mongoose = require('mongoose')
const Product = require('../models/ProductsModel')
const Joi = require("joi")
const STATUS = require('../utils/status')
const {schemaProduct}=require('../utils/validators.util')


module.exports = {

  async createProduct (req, res) {
    const {error}=schemaProduct.validate(req.body)
    if(error)return res.status(400).json({error:true,
    message:"Rellene correctamente los campos",
    nativeError:error})
    try {
     const productInDB= await Product.create(req.body)
      res.status(STATUS.OK).json({
        error: false,
        message: 'Producto registrado correctamente',
        productId:productInDB._id
      })
    } catch (error) {
      res.status(400).json({
        error: true,
        message: 'Error al registrar el producto',
        nativeError: error
      })
    }
  },



  async getAllProducts (req, res) {
    try {
      const productsDB = await Product.find({})
      res.status(STATUS.OK).json({
        error: false,
        message: 'Obtencion de datos correcta',
        data: productsDB
      })
    } catch (error) {
      res.status(STATUS.BAD_REQUEST).json({
        error: true,
        message: 'Error al obtener los productos',
        nativeError: error
      })
    }
  },



  async getProductById (req, res) {
    if(!req.params.id)return res.status(STATUS.BAD_REQUEST).json({
      error:true,
      message:"Introduce un id de producto"})
    try {
      const productDB = await Product.findById({ _id: req.params.id })
      if (productDB) {
        res.status(STATUS.OK).json({
          error: false,
          message: 'El producto ha sido encontrado!',
          data: {
            product:productDB
          }
        })
      }
    } catch (error) {
      res.status(STATUS.BAD_REQUEST).json({
        error: true,
        message: 'Error al encontrar el producto',
        nativeError: Error
      })
    }
  },



  async getProductByCategory (req, res) {
    if(!req.params.category)return res.status(STATUS.BAD_REQUEST).json({
      error:true,
      message:"Introduce una categoria"})
      
    try {
      const categoryDB = await Product.find({ category:req.params.category })
      if (categoryDB) {
        res.status(STATUS.OK).json({
          error: false,
          message: 'La categoria  ha sido encontrado!',
          data: categoryDB
        })
      }
    } catch (error) {
      res.status(STATUS.BAD_REQUEST).json({
        error: true,
        message: 'Error al encontrar la categoria',
        nativeError: error
      })
    }
  },


  async editProduct (req, res) {
    if(!req.body)return res.status(STATUS.BAD_REQUEST).json({
      error:true,
      message:"Introduce el producto editado"})

    if(!req.params.id)return res.status(STATUS.BAD_REQUEST).json({
      error:true,
      message:"Introduce un id de producto"})  

    try {
      const productDB = await Product.findByIdAndUpdate(
        req.params.id, req.body, { useFindAndModify: false }
     )
      res.status(STATUS.BAD_REQUEST).json({
        error: false,
        message: 'Producto editado correctamente',
        data:`El producto con id ${productDB._id} fue editado`
      })
    } catch (error) {
      res.status(STATUS.OK).json({
        error: true,
        message: 'Error al editar el producto',
        nativeError: error
      })
    }
  },



  async deleteProduct (req, res) {
    if(!req.params.id)return res.status(STATUS.BAD_REQUEST).json({
      error:true,
      message:"Introduce un id de producto"})
    try {
      const productDB = await Product.findByIdAndDelete({ _id: req.params.id})
      if (productDB) {
        res.status(STATUS.OK).json({
          error: false,
          message: 'Producto eliminado correctamente'
        })
      }
    } catch (error) {
      res.status(STATUS.BAD_REQUEST).json({
        error: true,
        message: 'Error al eliminar producto',
        nativeError: error
      })
    }
  }
}
