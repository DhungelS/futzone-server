import { StringDecoder } from 'string_decoder';

'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema ({
  rating: {type: Number, required: true},
  moment: {type: String},
  _user: {type:  Schema.Types.ObjectID, ref: 'User'}
});

mongoose.model('reviews', reviewSchema)