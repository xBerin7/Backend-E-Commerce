const mongoose = require('mongoose')
const Schema = mongoose.Schema
const productSchema = new Schema({
  category: {
    type: String,
    required: true,
    min: 7,
    max: 100
  },
  title: {
    type: String,
    required: true,
    min: 5,
    max: 100
  },
  features: {
    type: String,
    required: true,
    min: 7,
    max: 1200
  },
  details: {
    type: String,
    required: true,
    min: 5,
    max: 450
  },
  amount:{
    type:Number,
    default:1
  },
  sizes:{
    S:{
      amount:{
        type:Number,
      }
    },
    M:{
      amount:{
        type:Number,
      
      }
    },
    L:{
      amount:{
        type:Number,
      
      }
    },
    XL:{
      amount:{
        type:Number,
   
      }
    },
    XXL:{
      amount:{
        type:Number,
   
      }
    },
    XXXL:{
      amount:{
        type:Number,
  
      }
    },
    other:{
      amount:{
        type:Number,
    
      }
    },


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
  inCart:{
    type:Boolean,
    default:false
  },
  isOffert: {
    type: Boolean,
    default: false
  }

})
const Product = mongoose.model('Product', productSchema)

module.exports = Product
