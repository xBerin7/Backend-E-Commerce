const mongoose = require('mongoose')
const Cart = require('../models/CartModel')
const User = require ('../models/UserModel')
const Product = require('../models/ProductsModel')

module.exports={
    async getCart(req,res){
        const userExist = await User.findOne({ _id: req.body.iduser })
        if (!userExist) return res.json({ error: true, message: 'El usuario no existe' })

        try{
        const cartDB=await Cart.find({iduser:req.body.iduser})
        res.json({
            error:false,
            message:"Se encontro el carrito",
            data:cartDB
        })
            

        }catch(error){
            res.json({
                error:true,
                message:"Error al obtener el carrito",
                nativeError:error
            })
        }

    
    },
    async createCart(req,res){
        const userExist = await User.findOne({ _id:req.body.iduser })
        if (!userExist) return res.json({ error: true, message: 'El usuario no existe' })
        res.json({
            error:false,
            message:"Se creo el carrito"
        })
    
    },
    async updateCart(req,res){
        const isCart= await Cart.findById({_id:req.body.cartId})
        if(!isCart)return res.json({error:true,message:"El carrito no existe"})
        const isProduct =await Product.findById({_id:req.body.productId})
        if(!isProduct)return res.json({error:true,message:"El producto no existe",nativeError:error})
        await Product.findByIdAndUpdate(req.body.productId,{inCart:true})
        const productDB= await Product.findById({_id:req.body.productId})
        try{
            await Cart.findByIdAndUpdate(req.body.cartId,{products:productDB})
            res.json({
                error:false,
                message:"Producto agregado"
                
            })

        }catch(error){
            res.json({
                error:true,
                message:"Error al agregar producto",
                nativeError:error
            })
        }
    },
    async deleteProductCart(req,res){
        const collection= await Cart.findById({_id:req.body.cartId})
        const productToRemove = await collection.products.find(producto =>producto.id== req.body.productId)
            try{
            await collection.products.pull(productToRemove)
            savedDocument = collection.save()
           await Product.findByIdAndUpdate(req.body.productId,{inCart:false})
            res.json({
                error:false,
                message:"Producto eliminado"
            })
        }catch(error){
            res.json({
                error:true,
                message:"No se pudo eliminar",
                nativeError:error
            })
        }
        
    }
}