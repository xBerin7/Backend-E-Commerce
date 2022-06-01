module.exports= isAuthenticated=(req,res,next)=>{
    if(req.isAuthenticated()){
        return next()
    }else{
        res.json({error:true,message:"El usuario no esta autenticado"})
    }
}