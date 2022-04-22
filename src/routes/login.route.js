const { Router } = require('express')
const userController = require('../controllers/user.controller.js')
const login = Router()

login.post('/', userController.userLogin)

module.exports = login
