const Joi = require('joi')
const validateLogin = Joi.object({
    email: Joi.string().max(120).email(),
    password: Joi.string().min(6).max(25).required()
  })

const schemaRegister = Joi.object({
    name: Joi.string().min(3).max(23).required(),
    lastname: Joi.string().min(3).max(23).required(),
    email: Joi.string().max(120).email().required(),
    password: Joi.string().min(6).max(25).required(),
    cp: Joi.string().min(2).max(10)
  })

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

module.exports={validateLogin,schemaRegister,schemaProduct}