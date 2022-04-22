# Backend-E-Commerce
                        Uso de la API: 
1_  Peticiones hacia la base de datos (Login/Registro):
 Al momento de hacer alguna peticion referida al usuario en el cuerpo de la peticion se debe mandar por SEPARADO cada elemento correspondiente,no encapsular todo en un array/objeto.Ej:
 

 Method:Post
 Body:{
     name:name,
     lastname:lastname,
     email:email
     password:password

 }
 NO SE RECIBEN PETICIONES DONDE EL BODY SE GUARDE EN UN OBJETO O ARRAY POR EJEMPLO USANDO EL USESTATE Y PASANDO DE FORMA DIRECTA EL OBJETO.
 Cada elemento se ha de mandar por separado para el correcto uso de la API

 

            
