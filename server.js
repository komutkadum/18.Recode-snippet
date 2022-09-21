const express = require('express');
const cors = require('cors');
// initialisation and connection of mongo
require('./helpers/init_mongodb')

// importing routes
const snippetRoute = require('./routes/snippetRoute')
const profileRoute = require('./routes/profileRoute')
const searchRoute = require('./routes/searchRoute');

// creating express 
const app = express();

// middle ware
// app.use(cors({
//   origin:"*",
//   methods:"GET,HEAD,PUT,PATCH,POST,DELETE",
//   preflightContinue:false,
//   optionsSuccessStatus:200
// }))
app.use(function (req, res, next) {
  var allowedDomains = ['https://recode-snippet.web.app','http://localhost:3000','https://recode-snippet.firebaseapp.com' ];
  var origin = req.headers.origin;
  if(allowedDomains.indexOf(origin) > -1){
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
})
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// using routes
app.use('/profile',profileRoute)
app.use('/snippet',snippetRoute)
app.use('/search',searchRoute)



// main route
app.route('/').get(function (req, res) {
    res.sendFile(process.cwd() + '/index.html');
});

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log('server listening on port'+port)
})