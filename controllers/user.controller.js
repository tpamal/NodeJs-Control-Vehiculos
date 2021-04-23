'use strict'

var User = require ('../models/user');
var Vehicle = require('../models/vehicle')
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');


//--------------------------Crear usuario ------------------------//

function saveAdmin(req, res) {
    var user = new User();
    var params = req.body;

    if( params.userName &&
        params.email &&
        params.password){
            User.findOne({$or:[{email: params.email}]}, (err, userFind)=>{
                if(err){
                    res.status(500).send({message: 'Error general, intentelo mas tarde'})
                }else if(userFind){
                    res.send({message: 'usuario o correo ya utilizado'});
                }else{
                    user.userName = params.userName;
                    user.email = params.email;

                    bcrypt.hash(params.password, null, null, (err, passwordHash)=>{
                        if(err){
                            res.status(500).send({message: 'Error al encriptar contraseña'});
                        }else if(passwordHash){
                            user.password = passwordHash;

                            user.save((err, userSaved)=>{
                                if(err){
                                    res.status(500).send({message: 'Error general al guardar usuario'});
                                }else if(userSaved){
                                    res.send({user: userSaved});
                                }else{
                                    res.status(404).send({message: 'Usuario no guardado'});
                                }
                            });
                        }else{
                            res.status(418).send({message: 'Error inesperado'});
                        }
                    });
                }
            });
    }else{
        res.send({message: 'Ingresa todos los datos'});
    }
}



//--------------------Loguear Usuario---------------------------------//
function login(req, res) {
    var params = req.body;

    if (params.email) {
        if(params.password){
            User.findOne({$or:[{email: params.email}]}, (err, userFind)=>{
                if(err){
                    res.status(500).send({message:'Error in the server'});
                }else if(userFind){
                    bcrypt.compare(params.password, userFind.password, (err, checkPassword)=>{
                        if(err){
                            res.status(500).send({message: 'Error al comparar contraseñas'});
                        }else if (checkPassword){
                            if(params.gettoken){
                                res.send({token:jwt.createToken(userFind)})
                            }else{
                                res.send({user: userFind});
                            }
                        }else{
                            res.status(418).send({message: 'Contraseña incorrecta'});
                        }
                    });
                }else{
                    res.send({message: 'Usuario no encontrado'});
                }
            });
        }else{
            res.send({message: 'Por favor ingresa la contraseña'});
        }
    }else{
        res.send({message: 'Ingresa el email'});
    }
}



//--------------------- Editar Usuario----------------------//
function updateAdmin(req, res) {
    var update = req.body;
    User.findByIdAndUpdate(req.user.sub , update, { new: true }, (err, userUpdated) => {
        if (err) {
            res.status(500).send({ message: 'Error in the server' });
        } else if (userUpdated) {
            res.status(200).send({ user_actualizado: userUpdated });
        } else {
            res.status(200).send({ message: 'Error al actualizar' });
        }
    });
}


//-------------------------------- Eliminar Usuario----------------------------------------//
function deleteAdmin(req, res) {
    User.findByIdAndRemove(req.user.sub , (err, userDeleted) => {
        if (err) {
            res.status(500).send({ message: 'Error in the server' });
        } else if (userDeleted) {
            res.status(200).send({ message: 'Usuario eliminado', userDeleted });
        } else {
            res.status(404).send({ message: 'Error al eliminar' });
        }
    });

}


//-------------------------------Crear Vehiculo------------------------------//
function saveVehicle(req, res) {
    var vehicle = new Vehicle();
    var params = req.body;

    if( params.licensePlate ){
        Vehicle.findOne({licensePlate:params.licensePlate}, (err, vehicleFind)=>{
                if(err){
                    res.status(500).send({message: 'Error general'});
                }else if(vehicleFind){
                    res.send({message:'numero de matricula ya registrada'});
                }else{
                    vehicle.brand = params.brand;
                    vehicle.model = params.model;
                    vehicle.year = params.year;
                    vehicle.licensePlate = params.licensePlate;
                    vehicle.condition = params.condition;
                    vehicle.save((err, vehicleSaved)=>{
                        if(err){
                            res.status(500).send({message: 'Error general al guardar'});
                        }else if(vehicleSaved){
                            res.send({vehicle: vehicleSaved});
                        }else{
                            res.status(418).send({message: 'Error al guardar'});
                        }
                    });

                }
            });
    }else{
        res.send({message: 'Ingrese todos los campos'});
    }

}

//---------------------------- Editar Vehiculo--------------------------------
function updateVehicle(req, res) {
    var vehicleId = req.params.id;
    var update = req.body;

    Vehicle.findByIdAndUpdate(vehicleId, update, { new: true }, (err, vehicleUpdated) => {
        if (err) {
            res.status(500).send({ message: 'Error in the server' });
        } else if (vehicleUpdated) {
            res.status(200).send({ vehicle_actualizado: vehicleUpdated });
        } else {
            res.status(200).send({ message: 'Error al actualizar' });
        }
    });
}


//---------------------------- Eliminar Vehiculo------------------------------------------
function deleteVehicle(req, res) {
    var vehicleId = req.params.id;

    Vehicle.findByIdAndRemove(vehicleId, (err, vehicleDeleted) => {
        if (err) {
            res.status(500).send({ message: 'Error in the server' });
        } else if (vehicleDeleted) {
            res.status(200).send({ message: 'vehiculo eliminado', vehicleDeleted });
        } else {
            res.status(404).send({ message: 'Error al eliminar' });
        }
    });

}


//----------------------- listar vehiculos--------------------------------
function listVehicle(req, res) {
    Vehicle.find({}).exec((err, vehicle) => {
        if (err) {
            res.status(500).send({ message: 'Error in the server' });
        } else if (vehicle) {
            res.status(200).send({ todos_los_vehicles: vehicle });
        } else {
            res.status(200).send({ message: 'No se obtuvieron datos' });
        }
    });
}

module.exports = {
    saveAdmin,
    login,
    updateAdmin,
    deleteAdmin,
    saveVehicle,
    updateVehicle,
    deleteVehicle,
    listVehicle
   
}