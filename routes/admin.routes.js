'use strict'

var user = require('../controllers/user.controller');
var express = require('express');
var api = express.Router();
var middlewareAuth = require('../middlewares/authenticated');


// Ruta crear usuario
api.post('/saveAdmin', user.saveAdmin);

//Ruta loguear usuario
api.post('/login', user.login);

//Ruta Editar Usuario

api.put('/updateAdmin', middlewareAuth.ensureAuth, user.updateAdmin);

//Rura Eliminar Usuario
api.delete('/deleteAdmin', middlewareAuth.ensureAuth, user.deleteAdmin);

// Rutas crear vehiculo
 api.post('/saveVehicle', middlewareAuth.ensureAuth, user.saveVehicle);

 //Ruta Editar Vehiculo 
api.put('/updateVehicle/:id', middlewareAuth.ensureAuth, user.updateVehicle);

//Ruta Eliminar Vehiculo 
api.delete('/deleteVehicle/:id',middlewareAuth.ensureAuth, user.deleteVehicle);

//Reuta Listar Vehiculos
api.get('/listVehicle',middlewareAuth.ensureAuth, user.listVehicle);

module.exports = api;
