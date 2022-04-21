const router = require('express').Router()
const User =  require('../models/ValidateToken')
const res = require('express/lib/response')
const Joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userController = require('../controllers/user.controller')

router.post('/register', userController.userRegister)

module.exports= router
