'use strict';

var request = require('co-request');
var router = require('../../config/router');

/**
 *  getBooks service
 *  --------------------
 *
 *  Get list of books from external service
 *
 *  @returns Array [Object, ...]
 *
 */
module.exports = function *getBooks() {
  const response = yield request(router.getExternalRoute('BOOKS'));
  return JSON.parse(response.body);
};
