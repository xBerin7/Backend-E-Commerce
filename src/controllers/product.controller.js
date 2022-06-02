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
      const category = await Product.find({category:productDB.category})
      console.log(category)
      if (productDB) {
        res.json({
          error: false,
          message: 'El producto ha sido encontrado!',
          data: {
            product:productDB,
            category:category
          }
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
  async getProductByCategory (req, res) {
    const categoryCheck = req.params.category
    console.log("Esta es la categoria",categoryCheck)
    if(!categoryCheck)return res.json({error:true,message:"Introduce una categoria"})
    try {
      const categoryDB = await Product.find({ category:req.params.category })
      if (categoryDB) {
        res.json({
          error: false,
          message: 'La categoria  ha sido encontrado!',
          data: categoryDB
        })
      }
    } catch (error) {
      res.json({
        error: true,
        message: 'Error al encontrar la categoria',
        nativeError: error
      })
    }
  },
  async editProduct (req, res) {
    const body = req.body
    if(!body)return res.json({error:true,message:"Introduce el producto editado"})
    const productCheck = req.params.id
    if(!productCheck)return res.json({error:true,message:"Introduce un id de producto"})
    try {
      const productDB = await Product.findByIdAndUpdate(
        req.params.id, req.body, { useFindAndModify: false }
     )
     console.log(productDB)
      res.json({
        error: false,
        message: 'Producto editado correctamente',
        data:`El producto con id ${productDB._id} fue editado`
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
          message: 'Producto eliminado correctamente'
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
