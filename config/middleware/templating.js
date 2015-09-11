'use strict';

var jade = require('koa-jade');

module.exports = app => jade.middleware({ viewPath: 'app/views' });
