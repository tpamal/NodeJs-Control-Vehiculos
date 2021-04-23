'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vehicleSchema = Schema({

    brand: String,
    model: String,
    year: Number,
    licensePlate: String,
    condition: String
});


module.exports = mongoose.model('vehicle', vehicleSchema);