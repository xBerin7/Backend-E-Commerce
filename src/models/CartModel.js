const mongoose = require('mongoose')
const Schema = mongoose.Schema
const carritoSchema = new Schema(
  {
    iduser: {
      type: String
    },
    productsId:{
      type:String
    },
    products: [
      {
        productId: Number,
        title: String,
        price: Number
      }
    ],
    totalPrice:{
      type:Number,
      default:0
    },
    modifiedOn: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
)
const Cart = mongoose.model('Cart', carritoSchema)

module.exports = Cart
