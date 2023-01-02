const CategorieModel = require('../models/Categorie.js')
const mongoose = require('mongoose')
const Categorie = mongoose.model('Categorie');


function display(req, res) {
    Categorie.find()
        .then((categories) => {
            res.json(categories)
        })
        .catch()
}


function addCategorie(req, res) {
    const { body } = req
    Categorie.create({ ...body })
        .then((e) => {
            res.json({ message: 'categorie added successfully' })

        })
        .catch((error) => {
            res.send(error)
        })
}

function deleteCategorie (req, res) {
    const id  = req.params.id
    Categorie.findByIdAndRemove(id)
    .then((e)=>{
        res.send('removed')
    }).catch((e)=> {
         res.send('removed')
    })
}






module.exports = { display, addCategorie, deleteCategorie }
