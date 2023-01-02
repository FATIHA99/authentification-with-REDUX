const router = require('express').Router();
const {display, addCategorie, deleteCategorie} = require('../controllers/CategorieController')
router.delete('/categorie/:id',deleteCategorie)
router.get('/categories',display)
router.post('/categories',addCategorie)

module.exports = router;