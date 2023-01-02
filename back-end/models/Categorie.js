const mongoose = require('mongoose');

let categorie = new mongoose.Schema({
    label:{type:String},
    description:{type:String}
});
const Categorie = mongoose.model('Categorie',categorie)
module.exports= Categorie