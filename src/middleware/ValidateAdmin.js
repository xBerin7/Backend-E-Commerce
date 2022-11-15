const User = require ('../models/UserModel')
const STATUS = require('../utils/status')

const verifyAdmin=async(req,res,next)=>{
    const admin = req.header('auth-admin')
    if(!admin)return res.status(STATUS.UNAUTHORIZED).json({error:true,message:"Datos incorrecto"})
    const adminVerify = await User.findById({_id:admin})
    if(!adminVerify)return res.status(STATUS.UNAUTHORIZED).json({message:"No tienes acceso a esta funcion"})
    if(adminVerify.rol==false)return res.status(STATUS.UNAUTHORIZED).json({error:true,message:"Datos incorrecto"})
    console.log("An Admin has been logged",adminVerify)
    next()
}
module.exports=verifyAdmin