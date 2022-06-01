const passport = require('passport')
const Strategy = require('passport-local').Strategy
const User = require ('../models/UserModel')
const bcrypt = require ('bcrypt')
const Joi = require('joi')
const jwt = require('jsonwebtoken')

const validateLogin = Joi.object({
  email: Joi.string().max(120).email(),
  password: Joi.string().min(6).max(25).required()
})

passport.use('signIn',
    new Strategy(
        {
          usernameField:'email',
          passwordField:'password'
        },
        async(email,password,done)=> {
            
            if(!email)return done(null,{error: true,message:"Introduce un email"})
            if(!password)return done(null,{error: true,message:"Introduce un password"})
            
            const { error } = validateLogin.validate({email,password})
            if (error) {
              return done(null,{
                error: true,
                message: 'Error al iniciar sesion',
                nativeError: error
              })
            }
            const user = await User.findOne({ email })
            if (!user) return done(null,{ error: true, message: 'Usuario no encontrado', nativeError: error })
            else{
             const validPassword = await bcrypt.compare(password, user.password)
             if(validPassword){
             const token = jwt.sign({
              userEmail: email
            }, process.env.TOKEN_SECRET,{expiresIn:"24h"})

                return done(null,user,{error:false,message:"Logeador correctamente",data:{token,user}})
             }else{
                return done(null,{ error: true, message: 'Contraseña no valida', nativeError: error })
             }
            }
            

            
        
    })
);
passport.serializeUser((user,done)=>{
    done(null,user._id)
})
passport.deserializeUser((user,done)=>{
    User.findBy(id,(err,user=>{
        done(err,user)
    }))
    
})

module.exports = passport 