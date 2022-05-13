const mongoose = require('mongoose')
const Cart = require('../models/CartModel')
const User = require ('../models/UserModel')
const Product = require('../models/ProductsModel')


module.exports={
    async getCart(req,res) {
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
        console.log("Datoa del usuarios",userExist)
        if (!userExist) return res.json({ error: true, message: 'El usuario no existe' })
        if(userExist.idcart < 5)return res.json({ error: true, message:"El usuario ya tiene carrito"})
        const cartDB = new Cart({
            iduser:req.body.iduser
        }) 
        try {
          const cartInDB = await  cartDB.save()
           await User.findByIdAndUpdate(req.body.iduser,{idcart:cartInDB.ObjectId})
            res.json({
                error:false,
                message:"Se creo el carrito",
                data:{
                    idCart:cartInDB._id
                }
            })
        } catch (error) {
            res.json({error:true,message:"Error al crear el carrito",nativeError:error})
        }
    
    },
    async updateCart(req,res){
        const isCart= await Cart.findById({_id:req.body.cartId})
        if(!isCart)return res.json({error:true,message:"El carrito no existe"})
        const isProduct =await Product.findById({_id:req.body.productId})
        console.log("Este es el producto",isProduct,"Y esta es la cart",Cart)
        if(!isProduct)return res.json({error:true,message:"El producto no existe"})
        await Product.findByIdAndUpdate(req.body.productId,{inCart:true})
        console.log(isCart,isProduct)
        try{
            await Cart.findByIdAndUpdate(req.body.cartId,{$push:{ products: isProduct }})
            await Cart.findByIdAndUpdate(req.body.cartId,{$set:{ totalPrice: isCart.totalPrice + isProduct.price  }})
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
        if(!collection) return res.json({ error: true, message:"El carrito no existe"})
        const productToRemove = await collection.products.find(producto =>producto.id== req.body.productId)
        if(!productToRemove)return res.json({error:true,message:"No se pudo remover el producto"})
            try{
            await collection.products.pull(productToRemove)
            savedDocument = collection.save()
           await Product.findByIdAndUpdate(req.body.productId,{inCart:false})
           await Cart.findByIdAndUpdate(req.body.cartId,{$set:{ totalPrice: isCart.totalPrice - productToRemove.price  }})
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