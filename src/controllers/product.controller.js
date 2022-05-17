const mongoose = require('mongoose')
const Product = require('../models/ProductsModel')
const Joi = require("joi")


module.exports = {
  async createProduct (req, res) {
    const schemaProduct =Joi.object({
      category:Joi.string().max(50).required(),
      title:Joi.string().max(50).required(),
      features:Joi.string().max(300).required(),
      details:Joi.string().max(360).required(),
      foto:Joi.string(),
      amount:Joi.number(),
      price:Joi.number().required(),
      alternativePrice:Joi.number().required()
  
      
    })
    const {error}=schemaProduct.validate(req.body)
    if(error)return res.json({error:true,message:"Rellene correctamente los campos",nativeError:error})
    try {
     const productInDB= await Product.create(req.body)
      res.json({
        error: false,
        message: 'Producto registrado correctamente',
        data:productInDB._id
      })
    } catch (error) {
      res.status(400).json({
        error: true,
        message: 'Error al registrar el producto',
        nativeError: error
      })
    }
  },
  async getProduct (req, res) {
    try {
      const productsDB = await Product.find({})
      res.json({
        error: false,
        message: 'Obtencion de datos correcta',
        data: productsDB
      })
    } catch (error) {
      res.json({
        error: true,
        message: 'Error al obtener los productos',
        nativeError: error
      })
    }
  },
  async getProductById (req, res) {
    const productCheck = req.params.id
    if(!productCheck)return res.json({error:true,message:"Introduce un id de producto"})
    try {
      const productDB = await Product.findById({ _id: req.params.id })
      if (productDB) {
        res.json({
          error: false,
          message: 'El producto ha sido encontrado!',
          data: productDB
        })
      }
    } catch (error) {
      res.json({
        error: true,
        message: 'Error al encontrar el producto',
        nativeError: Error
      })
    }
  },

  async editProduct (req, res) {
    const body = req.body
    if(!body)return res.json({error:true,message:"Introduce el producto editado"})
    const productCheck = req.params.id
    if(!productCheck)return res.json({error:true,message:"Introduce un id de producto"})
    
    try {
      const productDB = await Product.FindByIdAndUpdate(
        req.params.id, body, { useFindAndModify: false }
      )
      res.json({
        error: false,
        message: 'Producto editado correctamente'
      })
    } catch (error) {
      res.json({
        error: true,
        message: 'Error al editar el producto',
        nativeError: error
      })
    }
  },
  async deleteProduct (req, res) {
    const productCheck = req.params.id
    if(!productCheck)return res.json({error:true,message:"Introduce un id de producto"})
    try {
      const productDB = await Product.findByIdAndDelete({ _id: req.params.id})
      if (productDB) {
        res.json({
          error: false,
          message: 'Editado correctamente'
        })
      }
    } catch (error) {
      res.json({
        error: true,
        message: 'Error al eliminar producto',
        nativeError: error
      })
    }
  }
}
