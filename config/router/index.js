'use strict';

var router = require('koa-router')(),
    controllers = require('../../app/controllers'),
    _ = require('lodash'),
    yaml = require('yamljs'),
    util = require('util');

const ROUTES = yaml.load(__dirname + '/routes.yml');
const EXTERNAL_ROUTES = yaml.load(__dirname + '/external.yml');

var routes = _.mapValues(ROUTES, (value) => {
  let controllerSpec = value.controller.split('#');
  let controllerName = controllerSpec[0];
  let controllerAction = controllerSpec[1];
  router[value.method](value.url, controllers[controllerName][controllerAction]);
  return value;
});

exports.getRoute = (alias) => routes[alias].url;
exports.getExternalRoute = (alias) => {
  let parameters = Array.prototype.slice.call(arguments, 1);
  parameters.unshift(EXTERNAL_ROUTES[alias].url);
  return util.format.apply(this, parameters);
};

module.exports = router;
