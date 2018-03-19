'use strict';

const mongoose = require('mongoose');


const reviewSchema = new mongoose.Schema ({
  match:  {type: String, required: true, unique: true},
  rating: {type: Number, required: true},
  moment: {type: String},
  _user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}

});


const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;