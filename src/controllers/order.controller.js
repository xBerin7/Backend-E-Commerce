const Order = require('../models/OrderModel')
const User = require('../models/UserModel')
const STATUS = require('../utils/status')
const Cart = require('../models/CartModel')
module.exports={
    async createOrder (req,res){
        if(!req.body.iduser)return res.status(STATUS.BAD_REQUEST).json({
            error:true,
            message:"Introduzca el id del usuario correctamente"
        })
        const userInDB =await  User.findById({_id:req.body.iduser})
        if(!userInDB.address[0])return res.status(STATUS.BAD_REQUEST).json({
            error:true,
            message:"El usuario no cuenta con datos del envio"
        })
        const cartInDB = await Cart.findById({_id:userInDB.idcart})
        const newOrder = new Order({
            iduser:req.body.iduser,
            cartId:userInDB.idcart,
            statement:"Procesando pedido",
            details:userInDB.address,
            totalPrice:cartInDB.totalPrice
        })
        const orderUpdated= await newOrder.save()
        try {
           const updateUser= await User.findByIdAndUpdate(
            req.body.iduser,{$push:{ ordersId:orderUpdated._id}}, { useFindAndModify: false }
             )
            res.status(STATUS.OK).json({
                error:false,
                message:"Orden creada"
            })
        } catch (error) {
            res.status(STATUS.BAD_REQUEST).json({
                error:true,
                message:"Error al crear la orden",
                nativeError:error
            })
        }

    },



    async updateOrder(req,res){
        if(!req.body.iduser && !req.body.orderId)return res.status(STATUS.BAD_REQUEST).json({
            error:true,
            message:"Introduzca el id del usuario correctamente"
        })  
        try {
            await Order.findByIdAndUpdate(req.body.orderId,req.body,{ useFindAndModify: false })
            return res.status(STATUS.OK).json({
                error:false,
                message:"Orden actualizada"
            })
        } catch (error) {
            return res.status(STATUS.BAD_REQUEST).json({
                error:true,
                message:"Error al actualizar la orden"
            })
        }
        


    }
}