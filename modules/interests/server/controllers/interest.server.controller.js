'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Interest = mongoose.model('Interest'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an interest
 */
exports.create = function (req, res) {
  var interest = new Interest(req.body);

  interest.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(interest);
    }
  });
};

/**
 * Show the current interest
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var interest = req.interest ? req.interest.toJSON() : {};

  // TODO: check if the current user has interest in this.
  // interest.isCurrentUserHasInterest = (req.user && req.user.interests.has(interest.title));

  // Add a custom field to the Interest, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  // article.isCurrentUserOwner = !!(req.user && article.user && article.user._id.toString() === req.user._id.toString());

  res.json(interest);
};

/**
 * Update an interest
 */
exports.update = function (req, res) {
  var interest = req.interest;

  interest.title = req.body.title;
  interest.description = req.body.description;

  interest.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(interest);
    }
  });
};

/**
 * Delete an interest
 */
exports.delete = function (req, res) {
  var interest = req.interest;

  interest.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(interest);
    }
  });
};

/**
 * List of Interests
 */
exports.list = function (req, res) {
  Interest.find().sort('-created').exec(function (err, interests) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(interests);
    }
  });
};

/**
 * Interest middleware
 */
exports.interestByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Interest is invalid'
    });
  }

  Interest.findById(id).exec(function (err, interest) {
    if (err) {
      return next(err);
    } else if (!interest) {
      return res.status(404).send({
        message: 'No interest with that identifier has been found'
      });
    }
    req.interest = interest;
    next();
  });
};
