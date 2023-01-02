const nodemailer = require('nodemailer')
const ls = require('local-storage')
const jwt = require('jsonwebtoken')

function _nodemailer() {
  
  const email = ls('email')
  const emtoken = jwt.sign({ email }, process.env.SECRETWORD)
  // ! transporter
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'fatihhaa27@gmail.com',
      pass: 'fwpktpowqxesuptk',
    },
  });
// ! onfo
  let info = {
    from: '"AUTHENTIFICATION" <fatihhaa27@gmail.com>',
    to: ls('email'),  // ! deja stocker dans  "signup"
    subject: "acount verification",
    html: '<a  href="http://localhost:3001/api/auth/confirm/' + emtoken + '">click here to verify </a>',
  };

  transporter.sendMail(info)
  console.log('sended')

}
module.exports = { _nodemailer }