const mongoose = require('mongoose');

let employeeSchema = new mongoose.Schema({
    fullName: {type: String},
    email: {type: String},
    password: {type: String },
    role: {type: String,default:'client'},
    confirmation: {type: Boolean,default: false},
});


mongoose.model('User', employeeSchema);