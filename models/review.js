

const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({

    username: String,
    movieid: String,
    rating: Number,
    text: String

})


module.exports = mongoose.model('Review', reviewSchema);