'use strict';

module.exports = function *(next) {
  try {
    yield next;
  } catch (err) {
    console.log(err.stack);
    this.status = err.status || 500;
    this.body = err.message;
  }
};
