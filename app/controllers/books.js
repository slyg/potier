'use strict';

var getBooksService = require('../services/getBooks'),
    getBestOfferService = require('../services/getBestOffer');

/**
 *  Main
 *
 *  Adds in context's body an array of book items
 *
 */
exports.main = function *booksController(){
  this.body = yield getBooksService();
};

/**
 *  Best offer
 *
 *  Adds in context's body an object
 *  corresponding to the best offer.
 *
 *  @param ctx.price {Number|String} is cart total price
 *  @param ctx.isbn  {String}        is the list of isbn references separated by a comma
 *
 * e.g. '/105/c8fabf68-8374-48fe-a7ea-a00ccd07afff,c30968db-cb1d-442e-ad0f-80e37c077f89,78ee5f25-b84f-45f7-bf33-6c7b30f1b502'
 */
exports.bestOffer = function *booksOffersController(){

  let args = [this.params.price];
  args.push.apply(args, this.params.isbns.split(','));

  this.body = yield getBestOfferService.apply(null, args);

};
