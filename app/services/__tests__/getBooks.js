var
  co = require('co'),
  expect = require('chai').expect,
  rewire = require('rewire'),
  getBooks = rewire('../getBooks');

describe('getBooks service', () => {

  'use strict';

  let
    routerMock,
    requestResponse;

  beforeEach(() => {
    requestResponse = {};
    routerMock = {};
    getBooks.__set__('router', routerMock);
    getBooks.__set__('request', () => Promise.resolve(requestResponse));
  });

  it('should grab books list from external resource aliased BOOKS', (done) => {

    routerMock.getExternalRoute = (alias) => {
      expect(alias).to.eql('BOOKS');
    };

    getBooks.__set__('request', (url) => {
      return Promise.resolve({
        body : JSON.stringify(['a', 'b'])
      });
    });

    co(function*(){
      let booksList = yield getBooks();
      expect(booksList).to.deep.eql(['a', 'b']);
    }).then(done, done);

  });

});
