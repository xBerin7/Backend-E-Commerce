const passport = require ('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require ('../models/UserModel')
require('dotenv').config()



const opts={}
opts.jwtFromRequest = ExtractJwt.fromHeader('auth-token')
opts.secretOrKey=process.env.TOKEN_SECRET


passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{
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