var
  co = require('co'),
  expect = require('chai').expect,
  rewire = require('rewire'),
  controller = rewire('../shop');

describe('shop controller', () => {

  'use strict';

  describe('main action', () => {

    let action = controller.main;

    it('should trigger a render of SHOP template', (done) => {

      let ctx = {
        render : (templateRef, data) => {
          expect(templateRef).to.eql('shop');
          expect(data).to.have.property('title').that.is.a('string');
          this.rendered = true;
        }
      };

      co(function*(){
        yield action.call(ctx);
        expect(ctx.rendered).to.be.ok;
      }).then(done, done);

    });

  });

});
