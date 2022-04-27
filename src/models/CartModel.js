const mongoose = require('mongoose')
const Schema = mongoose.Schema
const carritoSchema = new Schema(
  {
    userId: {
      type: String
    },
    productId:{
      type:String
    },
    products: [
      {
        productId: Number,
        quantity: Number,
        name: String,
        price: Number
      }
    ],
    modifiedOn: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
)
const Cart = mongoose.model('Cart', carritoSchema)

module.exports = Cart
