const User = require ('../models/UserModel')

const verifyAdmin=async(req,res,next)=>{
    const admin = req.header('auth-admin')
    if(!admin)return res.status(401).json({error:true,message:"Datos incorrecto"})
    const adminVerify = await User.findById({_id:admin})
    if(adminVerify.rol==false)return res.status(401).json({error:true,message:"Datos incorrecto"})
    console.log(admin)
    next()
}
module.exports=verifyAdmin