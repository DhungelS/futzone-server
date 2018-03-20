'use strict';

const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  googleId: String,
  reviews: [{type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'}]
});

const User = mongoose.model('users', userSchema);

module.exports = User;