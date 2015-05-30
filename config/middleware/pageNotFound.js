'use strict';

module.exports = function *pageNotFound(next){
  yield next;
  if (404 != this.status) return;
  this.status = 404;
  this.body = "nowhere else to go :(";
};
