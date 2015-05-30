'use strict';

exports.main = function *shopController(){
  this.render('shop', {
    title : 'La bibliothèque d\'Henri Potier'
  }, true);
};
