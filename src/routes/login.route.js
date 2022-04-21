const { Router } = require('express')
const userController = require('../controllers/user.controller.js')
const userLogin = Router()


userLogin.post('/', userController.userLogin)

module.exports = login
