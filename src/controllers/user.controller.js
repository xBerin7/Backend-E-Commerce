const Joi = require('joi')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const STATUS = require('../utils/status')
const User = require('../models/UserModel')

//! MOVER A HELPERS
const validateLogin = Joi.object({
  email: Joi.string().max(120).email(),
  password: Joi.string().min(6).max(25).required()
})

//! MOVER A HELPERS

//! MOVER A HELPERS
const schemaRegister = Joi.object({
  name: Joi.string().min(6).max(23).required(),
  lastname: Joi.string().min(6).max(23).required(),
  email: Joi.string().max(120).email().required(),
  password: Joi.string().min(6).max(25).required(),
  cp: Joi.string().min(2).max(10)
})
//! MOVER A HELPERS

module.exports = {
  async userLogin (req, res) {
    const { email, password } = req.body
    if(!email)return res.status(400).json({error: true,message:"Introduce un email"})
    if(!password)return res.status(400).json({error: true,message:"Introduce un password"})
    
    const { error } = validateLogin.validate(req.body)
    if (error) {
      return res.status(STATUS.BAD_REQUEST).json({
        error: true,
        message: 'Error al iniciar sesion',
        nativeError: error
      })
    }
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ error: true, message: 'Usuario no encontrado', nativeError: error })

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) return res.status(400).json({ error: true, message: 'Contraseña no valida', nativeError: error })

    const token = jwt.sign({
      userEmail: email
    }, process.env.TOKEN_SECRET,{expiresIn:"24h"})

    res.json({
      error: false,
      message: 'Usuario logeado correctamente',
      data: {
        token,
        iduser:user._id
      }
    })
  },
  async userRegister (req, res) {
    const { error } = schemaRegister.validate(req.body)
    if (error) {
      return res.status(STATUS.BAD_REQUEST).json({
        error: true,
        message: 'Error al registrar usuario , complete correctamente los campos',
        nativeError: error
      })
    }
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) return res.status(STATUS.BAD_REQUEST).json({ error: true, message: 'El email ya existe', nativeError: error })

    const rounds = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, rounds)
    const userDB = new User({
      name:req.body.name,
      lastname:req.body.lastname,
      email:req.body.email,
      password,
      cp:req.body.cp
    })
    try {
      await userDB.save()
      console.log(`Usuario nuevo registrado:${userDB}`)
      res.json({
        error: false,
        message: 'Usuario registrado'
      })
    } catch (error) {
      res.json({
        error: true,
        message: 'Error al registrar el usuario',
        nativeError: error
      })
    }
  }
}
