const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    avatar: {
        type: String,
    },
    bio: {
        type: String,
    },
    firstName: {
        type: String,
    },
    id: {
        type: Number,
    },
    lastName: {
        type: String,
    },
    title: {
        type: String,
    },
})

module.exports = mongoose.model('animals', animalSchema)