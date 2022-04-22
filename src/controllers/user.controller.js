const Joi = require('joi')
const bcrypt = require('bcrypt')
const STATUS = require('../utils/status')
const User = require('../middleware/ValidateToken.js')

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
  email: Joi.string().max(120).email(),
  password: Joi.string().min(6).max(25).required(),
  cp: Joi.string().min(2).max(10)
})
//! MOVER A HELPERS

module.exports = {
  userLogin (req, res) {
    const { error } = validateLogin.validate(req.body)
    if (error) {
      res.status(STATUS.BAD_REQUEST).json({
        error: true,
        message: 'Error al iniciar sesion',
        nativeError: error
      })
    }
  },
  async userRegister (req, res) {
    const { body } = req
    const { error } = schemaRegister.validate(body)
    if (error) {
      return res.status(STATUS.BAD_REQUEST).json({
        error: true,
        message: 'Error al registrar usuario , complete correctamente los campos',
        nativeError: error
      })
    }
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) return res.status(STATUS.BAD_REQUEST).json({ error: true, message: 'El email ya existe', nativeError: error })

    const rounds = await bcrypt.gentSalt(10)
    const password = await bcrypt.hash(req.body.password, rounds)

    try {
      const userDB = new User({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password,
        cp: req.body.cp
      })
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
