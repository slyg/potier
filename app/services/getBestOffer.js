'use strict';

var request = require('co-request');
var router = require('../../config/router');
var R = require('ramda');

var chooseBestOffer = (offers, totalPrice) => {

  const setPriceWithDiscount = (offer) => {
    switch (offer.type) {
      case 'percentage' : offer.finalPrice = (totalPrice * (1 - offer.value/100)); break;
      case 'minus'      : offer.finalPrice = Math.max(0, (totalPrice - offer.value)); break;
      case 'slice'      : offer.finalPrice = (totalPrice - Math.floor(totalPrice/offer.sliceValue) * offer.value); break;
    }
    return offer;
  };

  const extractBestDiscountedOfferFrom = R.compose(
    R.minBy(R.prop('finalPrice')),
    R.map(setPriceWithDiscount)
  );

  return extractBestDiscountedOfferFrom(offers);

};

/**
 *  getBestOffer service
 *  --------------------
 *
 *  Get offers from external service for a given set of isbn references
 *  then chooses the best offer amongst them
 *
 *  @param    {String}        totalPrice
 *  @param    {Array<String>} isbn
 *  @returns  {Object}        bestOffer
 *
 *  Returned Object looks like following
 *  { type: 'percentage' , finalPrice: 3, totalPrice: 4 }
 *
 */
module.exports = function *getBestOffer(totalPrice, ...isbns) {

  const response = yield request(router.getExternalRoute('BOOKS_OFFERS', isbns));

  const offers = JSON.parse(response.body).offers;

  let bestOffer = chooseBestOffer(offers, totalPrice);

  bestOffer.totalPrice = totalPrice;

  return bestOffer;

};
