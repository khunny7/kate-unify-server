'use strict';

/**
 * Module dependencies
 */
// var articlesPolicy = require('../policies/interest.server.policy'),
var interest = require('../controllers/interest.server.controller');

module.exports = function (app) {
  // Interests collection routes
  app.route('/api/interests')
    .get(interest.list)
    .post(interest.create);
  // app.route('/api/interests')
  //   .get(function (request, response) {
  //     response.json([
  //       {
  //         title: 'some title'
  //       },
  //       {
  //         title: 'some title2'
  //       }
  //     ]);
  //   });

  // Single interest routes
  app.route('/api/interest/:interestId')
    .get(interest.read)
    .put(interest.update)
    .delete(interest.delete);

  // Finish by binding the interest middleware
  app.param('interestId', interest.interestByID);
};
