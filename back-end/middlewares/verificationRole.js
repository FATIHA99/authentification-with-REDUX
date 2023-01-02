const jwt = require('jsonwebtoken')
const ls = require('local-storage')

// ! to verify role we get the token from local storage (alredy stored in login) and we verify it 
//! set the tkn in the res.data  and we check the array in parameters if include this role (from data) if true => next 

function verificationRole(access) {
  return (req, res, next) => {
    if (ls('token')) {  //!  login
      const t = ls('token');
      const token = jwt.verify(t, process.env.SECRETWORD)
      if (token) {
        req.data = token;
        if (access.includes(req.data.data.role)) { next() }
        else { res.json({ message: 'no user have this role ' }) }
      }
      else { res.json({ message: 'token not valid' }) }
    }
    else { res.json({ message: 'token not found ' }) }
  }
}




module.exports = { verificationRole }