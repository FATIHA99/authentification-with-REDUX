const router = require("express").Router()
const {signUp,signIn,confirmation,forgetPassword,resetPassword,Client,Livreur, logout} = require('../controllers/AuthController.js')
const verif = require('../middlewares/verificationRole')
const emv = require('../tools/nodemailer/email_verif')
const categorie = require("../controllers/CategorieController.js")
// ! authentification
router.post('/auth/login',signIn);
router.post('/auth/register',signUp);
// ! confirmation email 
router.get('/auth/confirm/:token',confirmation); 
// ! forget password /reset password 
router.post('/auth/forgotPassword',forgetPassword) 
router.post('/auth/resetPassword/:mailToken',resetPassword)
// ! roles
router.get('/auth/client', verif.verificationRole(['client']),Client)
router.get('/auth/livreur', verif.verificationRole(['livreur']),Livreur)
router.get('/auth/admin', verif.verificationRole(['admin']),(req,res)=>{res.json({message:'admin'})})
// ! log out 
router.get('/auth/logout',logout)
module.exports = router