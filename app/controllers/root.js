'use strict';

var router = require('../../config/router');

exports.main = function *rootController(){
  this.redirect(router.getRoute('SHOP'));
};
