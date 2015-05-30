var
  co = require('co'),
  expect = require('chai').expect,
  rewire = require('rewire'),
  controller = rewire('../books');

describe('books controller', () => {

  'use strict';

  describe('main action', () => {

    let action = controller.main;

    it('should set body context from getBooksService result', (done) => {

      controller.__set__('getBooksService', function*(){
        return {flag: true};
      });

      let ctx = {};

      co(function*(){
        yield action.call(ctx);
        expect(ctx.body.flag).to.be.ok;
      }).then(done, done);

    });

  });

  describe('bestOffer action', () => {

    let action = controller.bestOffer;

    it('should set body context from getBooksService result', (done) => {

      controller.__set__('getBestOfferService', function*(){
        expect(Array.prototype.slice.call(arguments)).to.deep.eql([4, 'a', 'b']);
        return {flag: true};
      });

      let ctx = {
        params : {
          price : 4,
          isbns : 'a,b'
        }
      };

      co(function*(){
        yield action.call(ctx);
        expect(ctx.body.flag).to.be.ok;
      }).then(done, done);

    });

  });

});
