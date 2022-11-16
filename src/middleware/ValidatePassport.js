const passport = require ('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const ValidateAuth=require('./ValidateAuth')
const User = require ('../models/UserModel')
require('dotenv').config()



const opts={}
opts.jwtFromRequest = ExtractJwt.fromHeader('auth-token')
opts.secretOrKey=process.env.TOKEN_SECRET


passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{
    if(!ValidateAuth)return done ({message:"Inicie sesion para acceder a esta funcion"})
    try{
    console.log(jwt_payload)
    const user = User.findById(jwt_payload.id)
    if(user)return done(null,user,{message:"Usuario logeado correctamente"})
    return done(null,false,{message:"Error al iniciar sesion"})
    
    }catch(error){
        console.log(error)
    }
    
}))

module.exports = passport