const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  rol: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  lastname: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 1024
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  cp: {
    type: String,
    minleght: 20
  },
  idcart:{
    type:Number,
    default:666
  },
  date: {
    type: Date,
    default: Date.now
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
