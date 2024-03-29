const mongoose = require('mongoose')
const Schema = mongoose.Schema
const orderSchema = new Schema(
  {
    iduser: {
      type: String
    },
    cartId:{
        type:String
    },
    statement:{
      type:String
    },
    details:[
      { 
        fullname:String,
        state:String,
        city:String,
        street:String,
        number:Number,
        optional:{
          floor: Number,
          departament:Number
        },
        zipcode: Number,
        cellphone:Number,
        note:String
      }
    ],
    totalPrice:{
      type:Number,
    },
    modifiedOn: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
)
const Order = mongoose.model('Order', orderSchema)

module.exports = Order