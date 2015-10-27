var
  co = require('co'),
  expect = require('chai').expect,
  rewire = require('rewire'),
  getBestOffer = rewire('../getBestOffer');

describe('getBestOffer service', () => {

  'use strict';

  let
    routerMock,
    requestResponse;

  beforeEach(() => {
    requestResponse = {};
    routerMock = {
      getExternalRoute : () => 'http://external/route'
    };
    getBestOffer.__set__('router', routerMock);
    getBestOffer.__set__('request', () => Promise.resolve(requestResponse));
  });

  it('should grab offers from external resource aliased BOOKS_OFFERS', (done) => {

    routerMock.getExternalRoute = (alias, isbns) => {

      expect(alias).to.eql('BOOKS_OFFERS');
      expect(isbns).to.deep.eql(['a', 'b', 'c']);

    };

    getBestOffer.__set__('request', (url) => {
      return Promise.resolve({
        body : JSON.stringify({
          offers: [
            { type: 'percentage' , value: 5        },                   // 95
            { type: 'minus'      , value: 15       },                   // 85
            { type: 'slice'      , value: 12       , sliceValue: 100}   // 88
          ]
        })
      });
    });

    co(function*(){
      yield getBestOffer(100, 'a', 'b', 'c');
    }).then(done, done);

  });

  it('should yield the best offer', (done) => {

    co(function*(){

      getBestOffer.__set__('request', (url) => {

        return {
          body : JSON.stringify({
            'offers': [
              { type: 'percentage' , value: 5  },
              { type: 'minus'      , value: 15 },
              { type: 'slice'      , value: 12 , sliceValue: 100 }
            ]
          })
        };

      });

      // minus is the best
      var bestOffer1 = yield getBestOffer(100, 'a', 'b', 'c');
      expect(bestOffer1.type).to.eql('minus');
      expect(bestOffer1.finalPrice).to.eql(85);

      // slice is the best
      var bestOffer2 = yield getBestOffer(200, 'a', 'b', 'c');
      expect(bestOffer2.type).to.eql('slice');
      expect(bestOffer2.finalPrice).to.eql(176);

      // percentage discount bug ;)
      getBestOffer.__set__('request', (url) => {

        return {
          body : JSON.stringify({
            'offers': [
              { type: 'percentage' , value: 50  },
              { type: 'minus'      , value: 15 },
              { type: 'slice'      , value: 12 , sliceValue: 100 }
            ]
          })
        };

      });

      var bestOffer3 = yield getBestOffer(100, 'a', 'b', 'c');
      expect(bestOffer3.type).to.eql('percentage');
      expect(bestOffer3.finalPrice).to.eql(50);

    }).then(done, done);

  });

});
