const mongoose = require('mongoose')
const Cart = require('../models/CartModel')
const User = require ('../models/UserModel')
const Product = require('../models/ProductsModel')
const STATUS = require('../utils/status')


module.exports={
    async getCart(req,res){
        if(!req.body.iduser && !req.body.cartId)return res.status(STATUS.BAD_REQUEST).json({
           error:true,
           message:"Ingrese correctamente los datos"
        })
        const userExistInCart = await Cart.findOne({ iduser: req.body.iduser })
        if (!userExistInCart) return res.status(STATUS.UNAUTHORIZED).json({
           error: true,
           message: 'El usuario no existe' 
        })

        try{
        const cartDB=await Cart.find({iduser:req.body.iduser})
        res.status(STATUS.OK).json({
            error:false,
            message:"Se encontro el carrito",
            data:cartDB
        })
        }catch(error){
            res.status(STATUS.BAD_REQUEST).json({
                error:true,
                message:"Error al obtener el carrito",
                nativeError:error
            })
        }

    
    },



    async createCart(req,res){
        if(!req.body.iduser)return res.status(STATUS.BAD_REQUEST).json({
            error:true,
            message:"Introduce un id de usuario"
        })
        const cartExist = await Cart.findOne({iduser:req.body.cartId})
        if(cartExist) return res.status(STATUS.BAD_REQUEST).json({
            error:true,
            message:"El carrito ya existe"
        })
        const userExist = await User.findOne({ _id:req.body.iduser })
        if (!userExist) return res.status(STATUS.BAD_REQUEST).json({error: true, 
            message: 'El usuario no existe'
        })
        if(userExist.idcart < 5)return({ error: true, message:"El usuario ya tiene carrito"})
        const cartDB = new Cart({
            iduser:req.body.iduser
        })
        
        try {
            const cartInDB = await  cartDB.save()
            console.log(cartInDB._id)
            const updateUser= await User.findByIdAndUpdate(
            req.body.iduser,{$set:{ idcart: cartInDB._id  }}, { useFindAndModify: false }
             )
            return res.status(STATUS.OK).json({
                error:false,
                message:"Se creo el carrito",
                data:{
                    cartId:cartInDB._id
                }
            })
        } catch (error) {
            return res.status(STATUS.BAD_REQUEST).json({
                error:true,
                message:"Error al crear el carrito",
                nativeError:error
                })
        }
    
    },
    async updateCart(req,res){
        if(!req.body.cartId && !req.body.productId)return res.status(STATUS.BAD_REQUEST).json({
            error:true,
            message:"Introduce un id de carrito"})
        if(!req.body.productId)return res.status(STATUS.BAD_REQUEST).json({
            error:true,
            message:"Introduce un id del producto"})
        const isACart= await Cart.findById({_id:req.body.cartId})
        if(!isACart)return res.status(STATUS.BAD_REQUEST).json({
            error:true,
            message:"El carrito no existe"})
        const isAProduct =await Product.findById({_id:req.body.productId})
        if(!isAProduct)return res.status(STATUS.BAD_REQUEST).json({
            error:true,
            message:"El producto no existe"})
        if(isAProduct.amount < 0)return res.json({error:true,message:"No hay stock"})
        const cartUpdated= await Cart.findByIdAndUpdate(req.body.cartId,{$push:{ products: isAProduct }})
        await Product.findByIdAndUpdate(req.body.productId,{inCartOf:isAProduct.inCartOf+1})
        await Product.findByIdAndUpdate(req.body.productId,{amount:isAProduct.amount-1})

        try{
            if(isAProduct.isOffert==false){
            let totalPriceNormal = await cartUpdated.products.map(e=>e.price).reduce((prev, curr) => prev + curr, isAProduct.price)
            await Cart.findByIdAndUpdate(req.body.cartId,{$set:{totalPrice: totalPriceNormal}})
            }else{
            let totalPriceOffert = await cartUpdated.products.map(e=>e.price).reduce((prev, curr) => prev + curr, isAProduct.price)
            await Cart.findByIdAndUpdate(req.body.cartId,{$set:{totalPrice: totalPriceOffert}})
            }
            

            
            res.status(STATUS.OK).json({
                error:false,
                message:"Producto agregado"
                
            })

        }catch(error){
            res.status(STATUS.BAD_REQUEST).json({
                error:true,
                message:"Error al agregar producto",
                nativeError:error
            })
        }
    },
    async deleteProductCart(req,res){
        if(!req.body.cartId && !req.body.productId)return res.status(STATUS.BAD_REQUEST).json({
           error:true,
           message:"Introduzca los datos correctamente"
        })
        const collection= await Cart.findById({_id:req.body.cartId})
        if(!collection) return res.status(STATUS.BAD_REQUEST).json({
            error: true,
            message:"El carrito no existe"
            })
        const productInDB = await Product.findById({_id:req.body.productId})
            try{
            await Product.findByIdAndUpdate(req.body.productId,{inCartOf:productInDB.inCartOf-1})
            const productToRemove = await Cart.findByIdAndUpdate({_id:req.body.cartId},
                {$pull:{products:{_id:req.body.productId}}})
            await Cart.findByIdAndUpdate(req.body.cartId,
                {$set:{ totalPrice: collection.totalPrice - productInDB.price  }})
           // await collection.products.pull(productToRemove)
           // savedDocument = collection.save()
        
            res.status(STATUS.OK).json({
                error:false,
                message:"Producto eliminado"
            })
        }catch(error){
            res.status(STATUS.OK).json({
                error:true,
                message:"No se pudo eliminar",
                nativeError:error
            })
        }
        
    }
}