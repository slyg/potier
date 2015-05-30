(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var has = ({}).hasOwnProperty;

  var aliases = {};

  var endsWith = function(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  };

  var unalias = function(alias, loaderPath) {
    var start = 0;
    if (loaderPath) {
      if (loaderPath.indexOf('components/' === 0)) {
        start = 'components/'.length;
      }
      if (loaderPath.indexOf('/', start) > 0) {
        loaderPath = loaderPath.substring(start, loaderPath.indexOf('/', start));
      }
    }
    var result = aliases[alias + '/index.js'] || aliases[loaderPath + '/deps/' + alias + '/index.js'];
    if (result) {
      return 'components/' + result.substring(0, result.length - '.js'.length);
    }
    return alias;
  };

  var expand = (function() {
    var reg = /^\.\.?(\/|$)/;
    return function(root, name) {
      var results = [], parts, part;
      parts = (reg.test(name) ? root + '/' + name : name).split('/');
      for (var i = 0, length = parts.length; i < length; i++) {
        part = parts[i];
        if (part === '..') {
          results.pop();
        } else if (part !== '.' && part !== '') {
          results.push(part);
        }
      }
      return results.join('/');
    };
  })();
  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';
    path = unalias(name, loaderPath);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has.call(cache, dirIndex)) return cache[dirIndex].exports;
    if (has.call(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  require.list = function() {
    var result = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  require.brunch = true;
  globals.require = require;
})();
require.register("shop/actions/ShopActions", function(exports, require, module) {
'use strict';

var ShopConstants = require('../constants/ShopConstants'),
    ShopAppDispatcher = require('../dispatcher/ShopAppDispatcher'),
    ShopService = require('../services/ShopService'),
    CartStore = require('../stores/CartStore');

exports.queryForBooks = function () {

  ShopAppDispatcher.dispatch({
    actionType: ShopConstants.SEARCH_BOOK_START
  });

  ShopService.getBooks();
};

exports.receiveBooks = function (books) {

  ShopAppDispatcher.dispatch({
    actionType: ShopConstants.RECEIVE_BOOKS,
    books: books
  });
};

exports.receiveBestOffer = function (bestOffer) {

  ShopAppDispatcher.dispatch({
    actionType: ShopConstants.RECEIVE_BEST_OFFER,
    bestOffer: bestOffer
  });
};

exports.receiveServerError = function (err) {

  ShopAppDispatcher.dispatch({
    actionType: ShopConstants.RECEIVE_SERVER_ERROR,
    error: err
  });
};

exports.addBookToCart = function (book) {

  ShopAppDispatcher.dispatch({
    actionType: ShopConstants.ADD_BOOK_TO_CART,
    book: book
  });

  ShopService.getBestOffer(CartStore.getTotalPrice(), _.map(CartStore.getItems(), function (item) {
    return item.isbn;
  }));
};

exports.removeFromCart = function (book) {

  ShopAppDispatcher.dispatch({
    actionType: ShopConstants.REMOVE_BOOK_FROM_CART,
    book: book
  });

  ShopService.getBestOffer(CartStore.getTotalPrice(), _.map(CartStore.getItems(), function (item) {
    return item.isbn;
  }));
};
});

require.register("shop/components/BookItem", function(exports, require, module) {
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var React = window.React,
    ShopActions = require('../actions/ShopActions');

var BookItem = (function (_React$Component) {
  function BookItem() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _classCallCheck(this, BookItem);

    _get(Object.getPrototypeOf(BookItem.prototype), 'constructor', this).apply(this, args);
    this._onAddToCart = this._onAddToCart.bind(this);
  }

  _inherits(BookItem, _React$Component);

  _createClass(BookItem, [{
    key: '_onAddToCart',
    value: function _onAddToCart() {
      ShopActions.addBookToCart(this.props.item);
    }
  }, {
    key: 'render',
    value: function render() {

      var item = this.props.item;

      /* jshint ignore:start */
      return React.createElement(
        'article',
        { className: 'book-item mbs grid-2' },
        React.createElement(
          'div',
          null,
          React.createElement('img', { className: 'book-cover', src: item.cover })
        ),
        React.createElement(
          'div',
          null,
          React.createElement(
            'h3',
            null,
            item.title
          ),
          React.createElement(
            'p',
            { className: 'pbs price' },
            item.price,
            '€'
          ),
          React.createElement(
            'p',
            null,
            React.createElement(
              'button',
              { onClick: this._onAddToCart, type: 'submit', className: 'btn btn-secondary' },
              'Ajouter au panier'
            )
          )
        )
      );
      /* jshint ignore:end */
    }
  }]);

  return BookItem;
})(React.Component);

module.exports = BookItem;
});

require.register("shop/components/BookList", function(exports, require, module) {
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var React = window.React,
    BookItem = require('./BookItem'),
    ReactCSSTransitionGroup = React.addons.CSSTransitionGroup,
    _ = window._;

var BookList = (function (_React$Component) {
  function BookList() {
    _classCallCheck(this, BookList);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(BookList, _React$Component);

  _createClass(BookList, [{
    key: 'render',
    value: function render() {

      var self = this;

      // If no results
      if (this.props.items.length < 1) {
        return (
          /* jshint ignore:start */
          React.createElement(
            'p',
            { className: 'tac ptl' },
            'Chargement...'
          )
        );
      }

      var bookItems = _.map(this.props.items, function (bookItem) {
        return (
          /* jshint ignore:start */
          React.createElement(
            'li',
            { key: bookItem.isbn },
            React.createElement(BookItem, { item: bookItem })
          )
        );
      });

      return (
        /* jshint ignore:start */
        React.createElement(
          ReactCSSTransitionGroup,
          { transitionName: 'default_transition', transitionAppear: true },
          React.createElement(
            'ul',
            { className: 'ul grid-2' },
            bookItems
          )
        )
      );
    }
  }]);

  return BookList;
})(React.Component);

module.exports = BookList;

//<BookItem />

/* jshint ignore:end */

/* jshint ignore:end */

/* jshint ignore:end */
});

;require.register("shop/components/Cart", function(exports, require, module) {
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var React = window.React,
    CartItem = require('./CartItem'),
    ReactCSSTransitionGroup = React.addons.CSSTransitionGroup,
    _ = window._;

var Cart = (function (_React$Component) {
  function Cart() {
    _classCallCheck(this, Cart);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(Cart, _React$Component);

  _createClass(Cart, [{
    key: 'render',
    value: function render() {

      var cartItems = _.map(this.props.cart.books, function (item) {
        /* jshint ignore:start */
        return React.createElement(
          'li',
          { key: item.isbn },
          React.createElement(CartItem, { item: item })
        );
        /* jshint ignore:end */
      });

      /* jshint ignore:start */
      return React.createElement(
        ReactCSSTransitionGroup,
        { transitionName: 'default_transition', transitionAppear: true },
        React.createElement(
          'div',
          null,
          React.createElement(
            'h2',
            null,
            'Votre panier'
          ),
          React.createElement(
            'ul',
            null,
            cartItems
          ),
          React.createElement(
            'div',
            { className: 'tar total' },
            'Total: ',
            this.props.cart.totalPrice,
            '€'
          )
        )
      );
      /* jshint ignore:end */
    }
  }]);

  return Cart;
})(React.Component);

module.exports = Cart;
});

require.register("shop/components/CartItem", function(exports, require, module) {
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var React = window.React,
    ShopActions = require('../actions/ShopActions');

var CartItem = (function (_React$Component) {
  function CartItem() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _classCallCheck(this, CartItem);

    _get(Object.getPrototypeOf(CartItem.prototype), 'constructor', this).apply(this, args);
    this._onRemoveFromCart = this._onRemoveFromCart.bind(this);
  }

  _inherits(CartItem, _React$Component);

  _createClass(CartItem, [{
    key: '_onRemoveFromCart',
    value: function _onRemoveFromCart() {
      ShopActions.removeFromCart(this.props.item);
    }
  }, {
    key: 'render',
    value: function render() {

      var item = this.props.item;

      /* jshint ignore:start */
      return React.createElement(
        'div',
        { className: 'grid-4-1' },
        React.createElement(
          'div',
          { className: 'title', onClick: this._onRemoveFromCart },
          item.title
        ),
        React.createElement(
          'div',
          { className: 'tar price' },
          item.amount,
          ' × ',
          item.price,
          '€'
        )
      );
      /* jshint ignore:end */
    }
  }]);

  return CartItem;
})(React.Component);

module.exports = CartItem;
});

require.register("shop/components/PayBox", function(exports, require, module) {
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var React = window.React;

var PayBox = (function (_React$Component) {
  function PayBox() {
    _classCallCheck(this, PayBox);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(PayBox, _React$Component);

  _createClass(PayBox, [{
    key: 'render',
    value: function render() {

      /* jshint ignore:start */
      var discountOffer = React.createElement('div', null);
      /* jshint ignore:end */

      if (this.props.discount !== null) {

        var finalPrice = (Math.round((this.props.discount.finalPrice + 0.00001) * 100) / 100).toFixed(2);

        /* jshint ignore:start */
        discountOffer = React.createElement(
          'div',
          { className: 'mbm' },
          React.createElement(
            'h2',
            null,
            'Vous bénéficiez d\'une offre spéciale !'
          ),
          React.createElement(
            'p',
            { className: 'tac' },
            finalPrice,
            '€ ',
            React.createElement(
              'small',
              null,
              'au lieu de ',
              React.createElement(
                'strike',
                null,
                this.props.discount.totalPrice,
                '€'
              ),
              ' !'
            )
          )
        );
        /* jshint ignore:end */
      }

      /* jshint ignore:start */
      return React.createElement(
        'div',
        { className: this.props.discount ? 'discount' : '' },
        discountOffer,
        React.createElement(
          'div',
          { className: 'tac' },
          React.createElement(
            'button',
            { className: 'btn btn-primary btn-large', type: 'submit' },
            'Passer ma commande'
          )
        )
      );
      /* jshint ignore:end */
    }
  }]);

  return PayBox;
})(React.Component);

module.exports = PayBox;
});

require.register("shop/components/ShopApp", function(exports, require, module) {
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var React = window.React,
    _ = window._,
    BookList = require('./BookList'),
    Cart = require('./Cart'),
    PayBox = require('./PayBox'),
    BookStore = require('../stores/BookStore'),
    CartStore = require('../stores/CartStore'),
    BestOfferStore = require('../stores/BestOfferStore'),
    ShopActions = require('../actions/ShopActions');

var ShopApp = (function (_React$Component) {
  function ShopApp() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _classCallCheck(this, ShopApp);

    _get(Object.getPrototypeOf(ShopApp.prototype), 'constructor', this).apply(this, args);

    this.state = {
      books: [],
      cart: { totalPrice: 0, books: [] },
      discount: null
    };

    this._onBooksChange = this._onBooksChange.bind(this);

    ShopActions.queryForBooks();
  }

  _inherits(ShopApp, _React$Component);

  _createClass(ShopApp, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this = this;

      _.each([BookStore, CartStore, BestOfferStore], (function (store) {
        store.addChangeListener(_this._onBooksChange);
      }).bind(this));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _this2 = this;

      _.each([BookStore, CartStore, BestOfferStore], (function (store) {
        store.removeChangeListener(_this2._onBooksChange);
      }).bind(this));
    }
  }, {
    key: '_onBooksChange',
    value: function _onBooksChange() {
      this.setState({
        books: BookStore.getItems(),
        cart: {
          totalPrice: CartStore.getTotalPrice(),
          books: CartStore.getItems()
        },
        discount: BestOfferStore.getItem()
      });
    }
  }, {
    key: 'render',
    value: function render() {

      var cart =
      /* jshint ignore:start */
      React.createElement('div', null);

      // Display cart content only when it is filled-in
      if (this.state.cart.totalPrice > 0) {
        /* jshint ignore:start */
        cart = React.createElement(
          'div',
          null,
          React.createElement(
            'div',
            { className: 'cart pbl' },
            React.createElement(Cart, { cart: this.state.cart })
          ),
          React.createElement(
            'div',
            { className: 'offer pbl' },
            React.createElement(PayBox, { discount: this.state.discount, cart: this.state.cart })
          )
        );
        /* jshint ignore:end */
      }

      /* jshint ignore:start */
      return React.createElement(
        'div',
        { className: 'grid-2-1' },
        React.createElement(
          'div',
          { className: 'book-list' },
          React.createElement(BookList, { items: this.state.books })
        ),
        React.createElement(
          'div',
          { className: 'cart-box' },
          cart
        )
      );
      /* jshint ignore:end */
    }
  }]);

  return ShopApp;
})(React.Component);

module.exports = ShopApp;

/* jshint ignore:end */
});

require.register("shop/constants/ShopConstants", function(exports, require, module) {
'use strict';

module.exports = {
  SEARCH_BOOK_START: 'SEARCH_BOOK_START',
  SEARCH_BEST_OFFER_START: 'SEARCH_BEST_OFFER_START',
  RECEIVE_BOOKS: 'RECEIVE_BOOKS',
  RECEIVE_BEST_OFFER: 'RECEIVE_BEST_OFFER',
  RECEIVE_SERVER_ERROR: 'RECEIVE_SERVER_ERROR',
  ADD_BOOK_TO_CART: 'ADD_BOOK_TO_CART',
  REMOVE_BOOK_FROM_CART: 'REMOVE_BOOK_FROM_CART'
};
});

require.register("shop/dispatcher/ShopAppDispatcher", function(exports, require, module) {
"use strict";

var Flux = window.Flux;
module.exports = new Flux.Dispatcher();
});

require.register("shop/fixtures/books", function(exports, require, module) {
"use strict";module.exports = [{"isbn":"c8fabf68-8374-48fe-a7ea-a00ccd07afff", "title":"Henri Potier à l'école des sorciers", "price":35, "cover":"data:image/jpeg;base64,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"}, {"isbn":"a460afed-e5e7-4e39-a39d-c885c05db861", "title":"Henri Potier et la Chambre des secrets", "price":30, "cover":"data:image/jpeg;base64,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"}, {"isbn":"fcd1e6fa-a63f-4f75-9da4-b560020b6acc", "title":"Henri Potier et le Prisonnier d'Azkaban", "price":30, "cover":"data:image/jpeg;base64,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"}, {"isbn":"c30968db-cb1d-442e-ad0f-80e37c077f89", "title":"Henri Potier et la Coupe de feu", "price":29, "cover":"data:image/jpeg;base64,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"}, {"isbn":"78ee5f25-b84f-45f7-bf33-6c7b30f1b502", "title":"Henri Potier et l'Ordre du phénix", "price":28, "cover":"data:image/jpeg;base64,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"}, {"isbn":"cef179f2-7cbc-41d6-94ca-ecd23d9f7fd6", "title":"Henri Potier et le Prince de sang-mêlé", "price":30, "cover":"data:image/jpeg;base64,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"}, {"isbn":"bbcee412-be64-4a0c-bf1e-315977acd924", "title":"Henri Potier et les Reliques de la Mort", "price":35, "cover":"data:image/jpeg;base64,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"}];
});

require.register("shop/fixtures/booksInCart", function(exports, require, module) {
"use strict";

module.exports = [{
  "isbn": "fcd1e6fa-a63f-4f75-9da4-b560020b6acc",
  "title": "Henri Potier et le Prisonnier d'Azkaban",
  "price": 30,
  "amount": 2
}, {
  "isbn": "c30968db-cb1d-442e-ad0f-80e37c077f89",
  "title": "Henri Potier et la Coupe de feu",
  "price": 29,
  "amount": 1
}];
});

require.register("shop/main", function(exports, require, module) {
'use strict';

var React = window.React,
    // Argh... brunch
ShopApp = require('./components/ShopApp');

React.render(
/* jshint ignore:start */
React.createElement(ShopApp, null),
/* jshint ignore:end */
document.getElementById('shop'));
});

require.register("shop/services/ShopService", function(exports, require, module) {
'use strict';

var request = window.$,
    ShopActions = require('../actions/ShopActions');

var BOOKS_URL = function BOOKS_URL() {
  return '/books';
};
var BEST_OFFER_URL = function BEST_OFFER_URL(price, isbns) {
  var isbnsString = isbns.join(',');
  return '/books/bestoffer/' + price + '/' + isbnsString;
};

exports.getBooks = function () {

  request.getJSON(BOOKS_URL(), ShopActions.receiveBooks).fail(ShopActions.receiveServerError);
};

exports.getBestOffer = function (price, isbns) {

  request.getJSON(BEST_OFFER_URL(price, isbns), ShopActions.receiveBestOffer).fail(function (err) {

    if (err.status === 404) {
      return ShopActions.receiveBestOffer(null);
    }

    ShopActions.receiveServerError(err);
  });
};
});

require.register("shop/stores/BestOfferStore", function(exports, require, module) {
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var AppDispatcher = require('../dispatcher/ShopAppDispatcher'),
    ShopConstants = require('../constants/ShopConstants'),
    Store = require('./Store');

var BestOfferStoreClass = (function (_Store) {
  function BestOfferStoreClass() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _classCallCheck(this, BestOfferStoreClass);

    _get(Object.getPrototypeOf(BestOfferStoreClass.prototype), 'constructor', this).apply(this, args);
    this.items = null;
  }

  _inherits(BestOfferStoreClass, _Store);

  _createClass(BestOfferStoreClass, [{
    key: 'reset',
    value: function reset() {
      this.items = null;
      return this;
    }
  }, {
    key: 'createItem',
    value: function createItem(item) {

      if (item) {
        this.items = item;
      } else {
        this.reset();
      }

      return this;
    }
  }, {
    key: 'getItem',
    value: function getItem() {
      return this.items;
    }
  }]);

  return BestOfferStoreClass;
})(Store);

var BestOfferStore = new BestOfferStoreClass();

AppDispatcher.register(function (action) {

  var text = undefined;

  switch (action.actionType) {

    case ShopConstants.RECEIVE_BEST_OFFER:
      BestOfferStore.createItem(action.bestOffer).emitChange();
      break;

  }
});

module.exports = BestOfferStore;
});

require.register("shop/stores/BookStore", function(exports, require, module) {
'use strict';

var AppDispatcher = require('../dispatcher/ShopAppDispatcher'),
    ShopConstants = require('../constants/ShopConstants'),
    Store = require('./Store');

var BookStore = new Store();

AppDispatcher.register(function (action) {

  var text = undefined;

  switch (action.actionType) {

    case ShopConstants.RECEIVE_BOOKS:
      BookStore.setItems(action.books).emitChange();
      break;

  }
});

module.exports = BookStore;
});

require.register("shop/stores/CartStore", function(exports, require, module) {
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var AppDispatcher = require('../dispatcher/ShopAppDispatcher'),
    ShopConstants = require('../constants/ShopConstants'),
    Store = require('./Store');

var CartStoreClass = (function (_Store) {
  function CartStoreClass() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _classCallCheck(this, CartStoreClass);

    _get(Object.getPrototypeOf(CartStoreClass.prototype), 'constructor', this).apply(this, args);
  }

  _inherits(CartStoreClass, _Store);

  _createClass(CartStoreClass, [{
    key: 'getTotalPrice',
    value: function getTotalPrice() {
      return _.reduce(this.items, function (total, item) {
        return total + item.price * item.amount;
      }, 0);
    }
  }, {
    key: 'createItem',
    value: function createItem(item) {

      var exists = this.items[item.isbn] ? true : false;

      if (exists) {
        this.items[item.isbn].amount++;
      } else {
        this.items[item.isbn] = item;
        this.items[item.isbn].amount = 1;
      }
      return this;
    }
  }]);

  return CartStoreClass;
})(Store);

var CartStore = new CartStoreClass();

AppDispatcher.register(function (action) {

  var text = undefined;

  switch (action.actionType) {

    case ShopConstants.ADD_BOOK_TO_CART:
      CartStore.createItem(action.book).emitChange();
      break;

    case ShopConstants.REMOVE_BOOK_FROM_CART:
      CartStore.removeItem(action.book).emitChange();
      break;

  }
});

module.exports = CartStore;
});

require.register("shop/stores/Store", function(exports, require, module) {
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var EventEmitter = window.EventEmitter2;

var Store = (function (_EventEmitter) {
  function Store() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _classCallCheck(this, Store);

    _get(Object.getPrototypeOf(Store.prototype), 'constructor', this).apply(this, args);
    this.items = {};
  }

  _inherits(Store, _EventEmitter);

  _createClass(Store, [{
    key: 'emitChange',
    value: function emitChange() {
      this.emit('change');
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.items = {};
      return this;
    }
  }, {
    key: 'createItem',
    value: function createItem(item) {
      this.items[item.isbn] = item;
      return this;
    }
  }, {
    key: 'removeItem',
    value: function removeItem(item) {
      delete this.items[item.isbn];
      return this;
    }
  }, {
    key: 'getItems',
    value: function getItems() {
      return this.items;
    }
  }, {
    key: 'setItems',
    value: function setItems(list) {
      var _this = this;

      this.reset();
      _.each(list, function (item) {
        _this.createItem(item);
      });
      return this;
    }
  }, {
    key: 'addChangeListener',
    value: function addChangeListener(callback) {
      this.on('change', callback);
    }
  }, {
    key: 'removeChangeListener',
    value: function removeChangeListener(callback) {
      this.removeListener('change', callback);
    }
  }]);

  return Store;
})(EventEmitter);

module.exports = Store;
});


//# sourceMappingURL=main.js.map