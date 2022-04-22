const { Router } = require('express')
const userController = require('../controllers/user.controller')

const register = Router()

register.post('/', userController.userRegister)

module.exports = register
