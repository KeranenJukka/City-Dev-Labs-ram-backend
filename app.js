


const express = require('express')
const app = express()

const mongoose = require('mongoose');
 
const bodyParser = require('body-parser');

require('dotenv/config');

const User = require('./models/user');
const Review = require('./models/review');



/* --------- MongoDB ------------ */

mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).catch(err => {

  console.log(err)

}).then(e => {

  console.log("Mongoose connected!")

});



/* ----------- Express ------------------ */

app.use(bodyParser.json());


/* ----------- Get Reviews -------------- */

app.get('/movie', function (req, res) {
  
  var id = req.query.id;

  Review.find({movieId: id})
  .then(response => {
    
    var json = JSON.stringify(response);

    res.send(json)
    

  })
  .catch()
  
})
 



app.listen(8080);




/*
const user = new User({

  name: "kerde",
  password: "moimoi"

})

user.save()
.then(res => {
  console.log(res)
});
*/


