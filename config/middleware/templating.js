'use strict';

var jade = require('koa-jade');

module.exports = (app) => {
  return jade.middleware({
    viewPath: 'app/views'
  });
};
