'use strict';

const {STATIC_DIR, PORT} = require('./config');

var app = require('koa')(),
    serve = require('koa-static'),
    router = require('./config/router'),
    middleware = require('./config/middleware'),
    controllers = require('./app/controllers');

/**
 * Middleware descriptor
 */
app
  .use(middleware.serverError)
  .use(serve(STATIC_DIR))
  .use(middleware.templating(app))
  .use(router.routes())
  .use(middleware.pageNotFound)
;

app.listen(process.env.PORT || PORT);
