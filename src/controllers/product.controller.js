const mongoose = require('mongoose')
const Product = require('../models/ProductsModel')

module.exports = {
  async createProduct (req, res) {
    const body = req.body
    try {
      await Product.create(body)
      res.json({
        error: false,
        message: 'Producto registrado correctamente'
      })
    } catch (error) {
      res.json({
        error: true,
        message: 'Error al registarr el producto',
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
    const id = req.params.id
    try {
      const productDB = await Product.findById({ _id: id })
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
    const id = req.params.id
    try {
      const productDB = await Product.FindByIdAndUpdate(
        id, body, { useFindAndModify: false }
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
    const id = req.params.id
    try {
      const productDB = await Product.findByIdAndDelete({ _id: id })
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
