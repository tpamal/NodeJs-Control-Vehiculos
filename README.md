##Proyecto de Control de Vehículos

**INSTALACION: **
Ingresar el siguiente comando en la terminal.
###### # npm install nodemon --save-ed
Debes de instalar nodemon antes de levantar el proyecto

Para levantar el proyecto utilizar el siguiente comando 
####### npm start

**FUNCIONALIDAD: **
Se puede crear un usuario y realizar varias tareas
Lleva un control de vehículos 
Se puede visualizar todos los vehículos 

####  Rutas
1.	Primero ser tiene que crear un usuario (saveAdmin)
####### api.post('/saveAdmin', user.saveAdmin);
2.	Luego tiene que loguear para poderse  Editar y Eliminar su usuario
####### api.post('/login', user.login);
#######api.put('/updateAdmin', middlewareAuth.ensureAuth, user.updateAdmin);
#######api.delete('/deleteAdmin', middlewareAuth.ensureAuth, user.deleteAdmin);
3.	Crear un vehículo
#######api.post('/saveVehicle', middlewareAuth.ensureAuth, user.saveVehicle);
4.	Editar un vehículo 
#######api.put('/updateVehicle/:id', middlewareAuth.ensureAuth, user.updateVehicle);
5.	Eliminar un vehículo
#######api.delete('/deleteVehicle/:id',middlewareAuth.ensureAuth, user.deleteVehicle);
6.	Listar todos los vehículos
#######api.get('/listVehicle',middlewareAuth.ensureAuth, user.listVehicle); 

