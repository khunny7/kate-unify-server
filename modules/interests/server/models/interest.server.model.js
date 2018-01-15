'use strict';

 /**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * InterestSchema
 */
var InterestSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  popularity: {
    type: Number,
    default: 0
  }
});

mongoose.model('Interest', InterestSchema);
