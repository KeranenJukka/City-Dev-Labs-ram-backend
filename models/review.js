

const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({

    user: String,
    movieId: String,
    rating: Number,
    text: String

})


module.exports = mongoose.model('Review', reviewSchema);