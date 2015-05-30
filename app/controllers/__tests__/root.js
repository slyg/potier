var
  co = require('co'),
  expect = require('chai').expect,
  rewire = require('rewire'),
  controller = rewire('../root');

describe('root controller', () => {

  'use strict';

  describe('main action', () => {

    let routerMock,
        action = controller.main;

    beforeEach(() => {
      routerMock = {};
      controller.__set__('router', routerMock);
    });

    it('should trigger a redirect to SHOP route', (done) => {

      let ctx = {
        redirect : (path) => {
          expect(path).to.eql('/route');
          this.redirected = true;
        }
      };

      routerMock.getRoute = (alias) => {
        expect(alias).to.eql('SHOP');
        return '/route';
      };

      co(function*(){
        yield action.call(ctx);
        expect(ctx.redirected).to.be.ok;
      }).then(done, done);

    });

  });

});
