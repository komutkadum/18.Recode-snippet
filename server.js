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
app.use(cors({
  origin:[process.env.CORS_ORIGIN_URL,process.env.CORS_ORIGIN_URL2,process.env.CORS_ORIGIN_URL3,"*"]
}))
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