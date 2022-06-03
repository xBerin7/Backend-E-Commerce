const axios = require('axios')
require('dotenv').config()
const Cart = require('../models/CartModel')
const Product = require ('../models/ProductsModel')
const Order = require('../models/OrderModel')
module.exports={
    async createOrder(req,res){
        console.log(req.body)
        const cartCheck = req.body.cartId
        if(!cartCheck)return res.json({error:true,message:"Introduce un id de carrito"})
        const productCheck= req.body.productId
        if(!productCheck && !cartCheck)return res.json({error:true,message:"Introduce un id de producto"})
        const cartDB= await Cart.findById({_id:req.body.cartId})
       if(!cartDB)return res.json({error:true,message:"Ingrese el id del carrito"})
        const productDB = await Product.findById({_id:req.body.productId})
        if(!productDB && !cartDB)return res.json({error:true,message:"Ingrese el id del producto"})
        console.log(cartDB)
        const order={
            intent:'CAPTURE',
            purchase_units:[
                {
                amount:{
                    currency_code:"USD",
                    value:cartDB? cartDB.totalPrice : productDB.price
                },
                description:"",
                },
            ],
            application_context:{
                brand_name:"Ecommerce Test",
                landing_page:"LOGIN",
                user_action:"PAY_NOW",
                return_url: "http://localhost:3000/payment/captureOrder",
                cancel_url:"http://localhost:3000/payment/cancelOrder"

        },
        };
      const {data}= await  axios.post(`${process.env.PAYPAL_API}/v2/checkout/orders`,order,{
            headers:{
                Authorization:`Bearer ${process.env.PAYPAL_TOKEN_API}`
            }
            
        })
        if(data.status == "CREATED")return res.json({error:false,message:"Orden de compra creada",data:data.links[1]})
        else return (res.json({error:true,message:"Error al crear la orden de compra"}))
        
        
    },
    async captureOrder(req,res){
        const {token,PayerID}=req.query

        const response = await axios.post(`${process.env.PAYPAL_API}/v2/checkout/orders/${token}/capture`,{},{
            auth:{
                username:process.env.PAYPAL_CLIENT_ID,
                password:process.env.PAYPAL_SECRET_ID
            }
        })
        console.log("ESTA ES LA DATA DEL PAGO",response.data)
        res.send("CAPTURE LA ORDEN PA ")
    }


}