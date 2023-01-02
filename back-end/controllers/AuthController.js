// !this file contain :
// TODO  sign in and signup function
// TODO  function confirmation for the email adresse 
// TODO  function forget password to  send the verification to the email 
// TODO function reset password to update password  after the email sended 
// TODO fuctions to render pages
// TODO function to logout

const model = require('../models/AuthModel.js')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const jwt = require('jsonwebtoken');
const ls = require('local-storage')
const verf = require('../tools/nodemailer/email_verif')
const password_verification = require('../tools/nodemailer/forgetPassword')
const HandleError = require('../tools/ErrorHandling');
const ErrorHandling = require('../tools/ErrorHandling');

// ! signUP :  first i store email body in the local s , and i hash the pass then i will  check the email if it   already exist , if not i will affect the hash password in body pass and i create the user then i confirm the account with nodemailer 
function signUp(req, res) {
    const { body } = req;
    ls('email', req.body.email) //! i will use this email in the  email  nodemailer verification
    const hashPassword = bcrypt.hashSync(body.password, 10)
    User.findOne({ email: body.email })
        .then((e) => {
            if (e) { res.json({ message: 'email already exist' }) }
            else {
                body.password = hashPassword;
                User.create({ ...body })
                    .then(() => {
                        verf._nodemailer()
                        res.json({ message: 'created successfully ! verify your email' })
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        })
        .catch()
}


// !  to sign in   i check first  the email if exist if true  i check again the password (after compare ) ,if everything is good i will check the confirmation is true , i will create token and stor them 
const signIn = (req, res) => {
    const { body } = req
    const pass = body.password

    User.findOne({ email: body.email }).then((e) => {
        if (e) {
            const data = e
            console.log(data)
            const hashPassword = bcrypt.compareSync(pass, e.password)
            if (!hashPassword) {
                res.json({ message: 'password wrong' })
            }
            else {

                if (e.confirmation) {
                    const token = jwt.sign({ data }, process.env.SECRETWORD) //! i will use it in the verification role 
                    ls('token', token);
                    res.json({
                     message: 'success' ,
                     info:data
                    })
                }
                else {
                    res.json({ message: 'confirm the email to access to your account  !!!!!'})
                }
            }

        } else {

            if (!body.email || !body.password) {
                res.json({ message: 'fill field !!' })
            }
            else {
                res.json({ message: 'user not found' })
            }
        }

    })
}
// !   verify the token and get the email , for updating confirmaion feild 
const confirmation = (req, res) => {
    const { token } = req.params;
    const tkn = jwt.verify(token, process.env.SECRETWORD)
    console.log(tkn)
    req.data = tkn
    console.log(req.data)
    User.findOneAndUpdate({ email: req.data.email }, { confirmation: true })
        .then(()=>{
            res.redirect('http://localhost:3000/api/auth/login')
        })
}
//  ! this function  check the email if exist or not if it exist the nodemailer  send an email to reset the password ( nodemailer send the link contain  mailToken )
const forgetPassword = (req, res) => {
    const { body } = req
    const email = body.email;
    User.findOne({ email: email })
        .then((user) => {
            if (!user) { res.json({message:'user not found with this email'}) }
            else {
                ls('mailToken', email) //!  to create token in nodemailer and send it in URL 
                password_verification.forgetpassword()
                res.json({message: 'visit email'})
            }
        })
}
// ! this function to update the password from the form who i already sended by the nodemailer  ,  i get the mail token from the URL and i verufy them  the i  find+update  the user password
const resetPassword = (req, res) => {
    const { mailToken } = req.params
    const verifToken = jwt.verify(mailToken, process.env.SECRETWORD)
    if(!verifToken){console.log('token wrong ')}
    req.mail = verifToken.mail;
    console.log('req maill:'+req.mail)
    const pass = req.body.password;
    const passHash = bcrypt.hashSync(pass, 10)
    User.findOneAndUpdate({ email: req.mail }, { password: passHash })
        .then((e) => {
            res.redirect('http://localhost:3000/api/auth/login')
        })
        .catch(error => {
            res.send(error)
        })
}
// ! just for roles 
const Client = (req, res) => { res.json({message:'Client Page '}) }
const Livreur = (req, res) => { res.json({message:'Livreur Page'}) }
// ! here i clear   local storage 
const logout = (req, res) => {
    ls.clear()
    res.json({message:'local storage is clear now '})
}
module.exports = { signUp, signIn, confirmation, forgetPassword, resetPassword,  Client, Livreur, logout }