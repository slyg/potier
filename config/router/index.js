'use strict';

var koaRouterFactory = require('koa-router'),
    appControllers = require('../../app/controllers'),
    R = require('ramda'),
    yaml = require('yamljs'),
    util = require('util');

const ROUTES = yaml.load(__dirname + '/routes.yml');
const EXTERNAL_ROUTES = yaml.load(__dirname + '/external.yml');

/**
 * Exposes routes utility helpers
 */
exports.getRoute = (alias) => ROUTES[alias].url;
exports.getExternalRoute = (alias, ...parameters) => {
  parameters.unshift(EXTERNAL_ROUTES[alias].url);
  return util.format.apply(this, parameters);
};

/**
 * Maps controllers and routes onto koa router
 * @param {Function} routerFactory
 * @param {Object} controllers
 * @returns {Object} router
 */
function init(routerFactory, controllers) {

  let router = routerFactory();

  R.mapObj(({controller:ctrl, method, url}) => {
    const [ctrlName, ctrlAction] = ctrl.split('#');
    router[method](url, controllers[ctrlName][ctrlAction]);
  }, ROUTES);

  return router;
}

module.exports = init(koaRouterFactory, appControllers);
