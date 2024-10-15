const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    bookId: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    series: {
        type: String
    },
    author: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    language: {
        type: String,
        required: true
    },
    genres: {
        type: [String]
    },
    characters: {
        type: [String]
    },
    bookFormat: {
        type: String
    },
    edition: {
        type: String
    },
    pages: {
        type: Number
    },
    publisher: {
        type: String
    },
    publishDate: {
        type: Date
    },
    firstPublishDate: {
        type: Date
    },
    numRatings: {
        type: Number
    },
    ratingsByStars: {
        type: [Number]
    },
    likedPercent: {
        type: Number
    },
    coverImg: {
        type: String
    },
    price: {
        type: Number
    }
});

module.exports = mongoose.model('Book', bookSchema);
