const mongoose = require('mongoose')
const Cart = require('../models/CartModel')
const User = require ('../models/UserModel')
const Product = require('../models/ProductsModel')


module.exports={
    async getCart(req,res) {
        const checkUser = req.body.iduser
        if(!checkUser)return res.json({error:true,message:"Introduce un id de usuario"})
        const checkCart = req.body.cartId
        if(!checkCart)return res.json({error:true,message:"Introduce un id de carrito"})
        const userExistInCart = await Cart.findOne({ iduser: req.body.iduser })
        if (!userExistInCart) return res.json({ error: true, message: 'El usuario no existe' })
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
        const userCheck = req.body.iduser
        if(!userCheck)return res.json({error:true,message:"Introduce un id de usuario"})
        const cartExist = await Cart.findOne({iduser:req.body.iduser})
        if(cartExist) return res.json({error:true,message:"El carrito ya existe"})
        const userExist = await User.findOne({ _id:req.body.iduser })
        if (!userExist) return res.json({ error: true, message: 'El usuario no existe' })
        if(userExist.idcart < 5)return res.json({ error: true, message:"El usuario ya tiene carrito"})
        const cartDB = new Cart({
            iduser:req.body.iduser
        })
        
        try {
            const cartInDB = await  cartDB.save()
            console.log(cartInDB._id)
            const updateUser= await User.findByIdAndUpdate(
            req.body.iduser,{$set:{ idcart: cartInDB._id  }}, { useFindAndModify: false }
             )
            res.json({
                error:false,
                message:"Se creo el carrito",
                data:{
                    cartId:cartInDB._id
                }
            })
        } catch (error) {
            res.json({error:true,message:"Error al crear el carrito",nativeError:error})
        }
    
    },
    async updateCart(req,res){
        const cartCheck = req.body.cartId
        if(!cartCheck)return res.json({error:true,message:"Introduce un id de carrito"})
        const productCheck = req.body.productId
        if(!productCheck)return res.json({error:true,message:"Introduce un id del producto"})
        const isCart= await Cart.findById({_id:req.body.cartId})
        if(!isCart)return res.json({error:true,message:"El carrito no existe"})
        const isProduct =await Product.findById({_id:req.body.productId})
        if(!isProduct)return res.json({error:true,message:"El producto no existe"})
        if(isProduct.amount == 0)return res.json({error:true,message:"No hay stock"})
        const totalPrice = await isCart?.products.map(e=>e.price).reduce((prev, curr) => prev + curr, 0)
        console.log(totalPrice)
        await Product.findByIdAndUpdate(req.body.productId,{inCart:true})
        await Product.findByIdAndUpdate(req.body.productId,{amount:isProduct.amount-1})
    
        try{
            await Cart.findByIdAndUpdate(req.body.cartId,{$push:{ products: isProduct }})
            await Cart.findByIdAndUpdate(req.body.cartId,{$set:{ totalPrice: totalPrice  }})
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
        const cartCheck = req.body.cartId
        if(!cartCheck)return res.json({error:true,message:"Introduce un id de carrito"})
        const productCheck = req.body.productId
        if(!productCheck)return res.json({error:true,message:"Introduce un id de producto"})
        const collection= await Cart.findById({_id:req.body.cartId})
        if(!collection) return res.json({ error: true, message:"El carrito no existe"})
        const productToRemove = await collection.products.findOneAndDelete(producto =>producto.id== req.body.productId)
        if(!productToRemove)return res.json({error:true,message:"No se pudo remover el producto"})
            try{
            await Cart.findByIdAndUpdate(req.body.cartId,{$set:{ totalPrice: collection.totalPrice - productToRemove.price  }})
            await collection.products.pull(productToRemove)
            savedDocument = collection.save()
           await Product.findByIdAndUpdate(req.body.productId,{inCart:false})
        
            res.json({
                error:false,
                message:"Producto eliminado"
            })
        }catch(error){
            res.status(400).json({
                error:true,
                message:"No se pudo eliminar",
                nativeError:error
            })
        }
        
    }
}