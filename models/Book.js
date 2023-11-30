const mongoose = require("mongoose");


const bookSchema = new mongoose.Schema({
    userId: String,
    title: String,
    author: String,
    year: Number,
    genre: String,
    imageUrl: String,
    ratings: [{
        userID: String,
        grade: Number
    }], 
    averageRating: Number
  });

const Book = mongoose.model("Book", bookSchema);

module.exports = {Book};