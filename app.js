


const express = require('express')
const app = express()

const mongoose = require('mongoose');
 
const bodyParser = require('body-parser');

require('dotenv/config');

const createToken = require('./webtoken/webtoken');
const verifyToken = require('./webtoken/webtoken2');

const comparePassword = require('./password/verifypassword')

const User = require('./models/user');
const Review = require('./models/review');




/* ------------ MongoDB -------------- */

mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).catch(err => {

  

}).then(e => {

  console.log("Mongoose connected!")

});



/* ----------- Express ------------------ */

app.use(bodyParser.json());


/* ----------- Get Reviews -------------- */

app.get('/movie', function (req, res) {
  
  var id = req.query.id;

  Review.find({movieid: id})
  .then(res1 => {
    
    var json = JSON.stringify(res1);

    res.send(json)
    

  })
  .catch()
  
})



/* ----------- Check and Create Account -------------- */

app.post('/create', function (req, res) {


  var username = req.body.params.username;
  var password = req.body.params.password;

  // find user
  User.find({username: username})
  .then(res1 => {

    // if not found
    if (res1.length === 0) {
 
      const user = new User({

        username: username,
        password: password

      })

      // save user
      user.save()
      .then(() => {

        //create webtoken
        createToken(username)
        .then(tok => {

          res.send({
            type: "success",
            username: username,
            token: tok
          })
  
          })
        .catch(err => {
          res.send("error")
        })


        })
        .catch()

      
    }

    // if found 
    else {

      res.send("found")

    }

  })
  .catch(err => {

  })
  
})
 


/* ----------- Login and check password -------------- */

app.post('/login', function (req, res) {


  var username = req.body.params.username;
  var password = req.body.params.password;

  // find user
  User.find({username: username})
  .then(res1 => {

    // user not found
    if (res1.length === 0) {

      res.send("no")

    }

    // user found
    else if (res1.length !== 0) {
    
      var hash = res1[0].password;
      
      // check password
      comparePassword(password, hash)
      .then(res2 => {
        
        // password true
        if (res2 === true) {

          createToken(username)
          .then(res3 => {

            res.send({
              type: "success",
              token: res3
            })

          })

        }

        // password false
        else if (res2 === false) {

          res.send("no");

        }

      })

    }

  }) 

})


/* ----------- Login and check password -------------- */

app.post('/review', function (req, res) {

  var token = req.body.params.token;

  // check token
  verifyToken(token)
  .then(res1 => {


    var username = res1.data;
    var movieid = req.body.params.movieid;
    var rating = req.body.params.rating;
    var text = req.body.params.text;

    const review = new Review({

      username: username,
      movieid: movieid,
      rating: rating,
      text: text

    })

    // save review
    review.save()
    .then(() => {

      res.send("success");

    })


  })
  .catch (err => {

    res.send("no")

  })


 })



/* ----------- Get my Reviews -------------- */

app.get('/myreviews', function (req, res) {

  

  // check token
  verifyToken(req.query.token)
  .then(res1 => {

    // find reviews
    Review.find({username: res1.data})
    .then(res2 => {

      res.send(res2)

    })

  }).
  catch(err => {

    res.send("no")

  })
 

 })



 /* ----------- Delete Review -------------- */

 app.delete('/deletereview', function (req, res) { 

  // verify token
  verifyToken(req.query.token)
  .then(res1 => {

    // delete review
    Review.deleteOne({_id: req.query.id})
    .then(res2 => {

      res.send("success")

    })


  })
  .catch(err => {

    res.send("no")

  })



 })



app.listen(8080);





