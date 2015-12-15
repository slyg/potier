'use strict';

var Jade = require('koa-jade');

module.exports = app => new Jade({ viewPath: 'app/views' }).middleware;
