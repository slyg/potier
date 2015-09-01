'use strict';

var router = require('koa-router')(),
    controllers = require('../../app/controllers'),
    R = require('ramda'),
    yaml = require('yamljs'),
    util = require('util');

const ROUTES = yaml.load(__dirname + '/routes.yml');
const EXTERNAL_ROUTES = yaml.load(__dirname + '/external.yml');

var routes = R.mapObj((value) => {
  let controllerSpec = value.controller.split('#');
  let controllerName = controllerSpec[0];
  let controllerAction = controllerSpec[1];
  router[value.method](value.url, controllers[controllerName][controllerAction]);
  return value;
}, ROUTES);

exports.getRoute = (alias) => routes[alias].url;
exports.getExternalRoute = (alias) => {
  let parameters = Array.prototype.slice.call(arguments, 1);
  parameters.unshift(EXTERNAL_ROUTES[alias].url);
  return util.format.apply(this, parameters);
};

module.exports = router;
