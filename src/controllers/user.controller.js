const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const STATUS = require('../utils/status')
const User = require('../models/UserModel')
const {createCart}=(require('../controllers/cart.controller'))
const {validateLogin,schemaRegister}=(require('../utils/validators.util'))



module.exports = {

  //Inicio de sesion//

  async userLogin (req, res) {
    const { email, password } = req.body
    if(!email && !password)return res.status(STATUS.BAD_REQUEST).json({error: true,message:"Ingrese correctamente los datos"})
    const { error } = validateLogin.validate(req.body)
    if (error) {
      return res.status(STATUS.BAD_REQUEST).json({
        error: true,
        message: 'Error al iniciar sesion',
        nativeError: error
      })
    }
    const user = await User.findOne({ email })
    if (!user) return res.status(STATUS.BAD_REQUEST).json({ error: true, message: 'Usuario no encontrado', nativeError: error })

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) return res.status(STATUS.BAD_REQUEST).json({ error: true, message: 'Contraseña no valida', nativeError: error })

    const token = jwt.sign({
      id:user._id,
      email:user.email,
    }, process.env.TOKEN_SECRET,{expiresIn:"24h"})

    res.status(STATUS.OK).json({
      error: false,
      message: 'Usuario logeado correctamente',
      data: {
        token,
        iduser:user._id,
        cartId:user.idcart
      }
    })
  },

//Registro de usuarios//

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
      const userInDB =await userDB.save()
      //Creacion del carrito del usuario//
      await createCart(userInDB._id,res)
      //                               //
      console.log(`Usuario nuevo registrado:${userDB}`)
      res.status(STATUS.OK).json({
        error: false,
        message: 'Usuario registrado'
      })
    } catch (error) {
      res.status(STATUS.BAD_REQUEST).json({
        error: true,
        message: 'Error al registrar el usuario',
        nativeError: error
      })
    }
  }
}