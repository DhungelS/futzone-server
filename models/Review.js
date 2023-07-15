'use strict';

const mongoose = require('mongoose');


const ReviewSchema = new mongoose.Schema ({
  matchId: {type: String },
  match: {type: String},
  rating: {type: Number, required: true},
  moment: {type: String},
  _user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
});


const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;