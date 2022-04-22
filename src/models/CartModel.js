const mongoose = require('mongoose')
const Schema = mongoose.Schema
const carritoSchema = new Schema({
    category: {
    type: String,
    required: true,
    min: 70,
    max: 100
  },
  products: {
    type: String,
    required: true,
    min: 70,
    max: 100
  },
  details: {
    type: String,
    required: true,
    min: 700,
    max: 1200
  },
  prices: {
    type: String,
    required: true,
    min: 400,
    max: 450
  },
  totalPrice: {
    type: String,
    required: true,
    // Pronto BETA TEST required//
  },
  alternativeTotalPrice: {
    type: Number
  },
  isOffert: {
    type: Boolean,
    default: false
  }

})
const Carrito = mongoose.model('Carrito', carritoSchema)

module.export = Carrito
