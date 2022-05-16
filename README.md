# Backend-E-Commerce
                          Presentacion :
La API cuenta con 5 rutas principales:
**Register**
**Login**
**Products**
**Cart**
**Payment**

                     Respuestas de la API 
                     
                     
**LA RESPUESTA DE LA API SOLO CONTIENE  4 POSIBLES CAMPOS**
``
error: TRUE OR FALSE (muestra si la respuesta fue correcta o no).
messsage: Devuelve un mensaje en español  que puede ser mostrado al usuario o no.
data: Contiene la informacion requerida.
nativeError: (Solo algunos request lo tienen)muestra el error completo.``
                             ###Rutas
                             
                                  REGISTRO
             
         *Peticiones hacia la base de datos (Login/Registro):*
 Al momento de hacer alguna peticion referida al usuario en el cuerpo de la peticion se debe mandar por SEPARADO cada elemento correspondiente,no encapsular todo en un array/objeto.
 **Ej Request Registro** 

``Method:"POST",
 Body:{
     name:name,
     lastname:lastname,
     email:email
     password:password}
 *Respuesta:*
 {
  "error": false,
  "message": "Usuario registrado"
}``


                            LOGIN
                            
                            
``Method:"POST"
Body:{
    "email":"Example@example.com",
    "password":"123456"
}
*Respuesta:*
{
  "error": false,
  "message": "Usuario logeado correctamente",
  "data": {
    "token": "exampleToken",
    "iduser": "xxxxxxxxxxxxxxx"
  }
}``
*Guardar el token*

                        PRODUCTS
                        
                        
*/products* "GET" : Devuelve todos los productos
*/products/id:*  "GET" : Devuelve el producto con esa id
            *Admin*:
*/products/create*  "POST" :Crea nuevo producto con los siguientes campos requeridos *Only ADMIN*
``Campos requeridos : 

*category:String,*
*title:String,*
*features:String,*
*details:String,*
*photo:SRC (BETA),*
*price:Number,*
*alternativePrice:Number,*
*InCart:Boolean,*
*isOffert:Boolean*``

*/products/edit/:id*  "PUT" : Permite modificar un producto *Only ADMIN*


``Campos requeridos:
*category:String,*
*title:String,*
*features:String,*
*details:String,*
*photo:SRC (BETA),*
*price:Number,*
*alternativePrice:Number,*
*InCart:Boolean,*
*isOffert:Boolean*``



                    CART
                    
                    
*/cart/* "GET" : Obtiene el carrito del usuarios.
 ``   Ejemplo de request :
Body:{
    iduser,
    cartId
}``              
*/cart/create*  "POST" : Crea el carrito para el usuario(Crear cuando el usuario se registra)
     *Devuelve una id de carrito*
     
*/cart/add¨*  "POST" : Agrega un nuevo producto al carrito del usuario.Requiere:

``Body:{
    iduser,
    cartId,
    productId
}``

*/cart/delete*  "POST" :Elimina un producto del carrito del usuarios .Requiere:

``Body:{
    iduser,
    cartId,
    productId
}``

                            PAYMENT
                            
                            
*/payment/createOrder*  "POST" :Crea una orden para el pago del usuario.Requiere
``Body:{
    cartId OR ProductId,
}``

*/payment/captureOrder*  "GET" :Captura la orden (Al finalizar redireccionar al usuario)





 



 

            

