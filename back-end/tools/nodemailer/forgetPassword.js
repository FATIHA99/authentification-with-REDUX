const nodemailer = require('nodemailer')
const ls = require('local-storage')
const jwt = require('jsonwebtoken')

  /*  mail token  : forget 
   get the  token from URL 
  verify the token 
  set the email  request equal  the result of verification
  hash the body password 
  find the user  by email  who i store in the token 
  update the password  with the hash 
  then redirect api ...login */
function forgetpassword() {
  const mail = ls('mailToken')
  console.log(mail)
  const mailToken = jwt.sign({ mail }, process.env.SECRETWORD)  // TOKEN HAVE EMAIL 
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'fatihhaa27@gmail.com',
      pass: 'fwpktpowqxesuptk',
    },
  });

  let info = {
    from: '"MARHABA :forget password" <fatihhaa27@gmail.com>',
    to: mail, 
    subject: "acount verification",
    // html: '<a href="http://localhost:8080/api/auth/resetPassword/' + mailToken + '">click here to reset password </a>',

    html: ' <form  action="http://localhost:3001/api/auth/resetPassword/'+ mailToken +'" method="post"><h1> reset password </h1><input input="text" placeholder="password" name="password"> </br> <input type="submit" name="submit"></form>'
  };

  transporter.sendMail(info)
  console.log('visit your email to reset password')
}

module.exports = { forgetpassword }