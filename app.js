'use strict';

const config = require('./config/all');

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
  .use(serve(config.STATIC_DIR))
  .use(middleware.templating(app))
  .use(router.routes())
  .use(middleware.pageNotFound)
;

app.listen(process.env.PORT || config.PORT);
