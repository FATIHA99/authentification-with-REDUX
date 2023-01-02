const express = require('express');
const dotenv = require('dotenv');
const db = require('./db/db.js')
const route = require('./routes/auth');
const routeCategorie = require('./routes/categorie');
// const HandleError = require('./tools/ErrorHandling.js');
const ErrorHandling = require('./tools/ErrorHandling.js');
// const GlobalErr = require('./tools/globalError');
const globalError = require('./middlewares/globalError');
const cors = require('cors');

const port = process.env.port || 3001
const app = express();
dotenv.config();
app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({ extended : false }))
app.use(cors());
app.use('/api',route);
app.use('/api',routeCategorie);

app.all('*',(req,res,next)=>{
    next(new ErrorHandling(`page not found :${req.originalUrl}`,400))
})

app.use(globalError)
app.listen(port,()=>{ console.log(`PORT ${port}`)})
module.exports = app