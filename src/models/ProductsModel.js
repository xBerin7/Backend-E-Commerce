const mongoose = require('mongoose')
const Schema = mongoose.Schema
const productSchema = new Schema({
  category: {
    type: String,
    required: true,
    min: 70,
    max: 100
  },
  title: {
    type: String,
    required: true,
    min: 70,
    max: 100
  },
  features: {
    type: String,
    required: true,
    min: 700,
    max: 1200
  },
  details: {
    type: String,
    required: true,
    min: 400,
    max: 450
  },
  foto: {
    type: String
    // Pronto BETA TEST required//
  },
  price: {
    type: Number,
    required: true
  },
  alternativePrice: {
    type: Number
  },
  isOffert: {
    type: Boolean,
    default: false
  }

})
const Product = mongoose.model('Product', productSchema)

module.export = Product