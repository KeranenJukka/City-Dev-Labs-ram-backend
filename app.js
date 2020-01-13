
const express = require('express')
const app = express()
 
app.get('/movie', function (req, res) {
    console.log("jepa")
  res.send('Hello World')
})
 
app.listen(8080);

