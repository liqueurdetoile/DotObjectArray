(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
*  @file ObjectArray class declaration
*  @author  Liqueur de Toile <contact@liqueurdetoile.com>
*  @license MIT {@link https://choosealicense.com/licenses/mit/}
*  @see [Github]{@link https://github.com/liqueurdetoile/objectarray}
*  @see [Author website]{@link https://liqueurdetoile.com}
*/

/**
*  @classDesc
*  The ObjectArray class implements array-like properties and methods to a key/value javascript object.*
*  It can be viewed as a kind of associative array in JS but it also
*  supports dot notation keys.
*
*  @class ObjectArray
*  @since 1.0.0
*  @version 1.0.0
*  @author Liqueur de Toile <contact@liqueurdetoile.com>
*  @license MIT {@link https://choosealicense.com/licenses/mit/}
*  @see [Github]{@link https://github.com/liqueurdetoile/objectarray}
*  @see [Author website]{@link https://liqueurdetoile.com}
*
*  @param   {Object}    data  Initial data to push into the ObjectArray
*
*  @returns {ObjectArray} ObjectArray object
*  @description
*  The constructor is straight-forward. It can be provided with an existent object
*/

var ObjectArray = function () {
  function ObjectArray() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, ObjectArray);

    /**
    *  The inner data object
    *
    *  @alias ObjectArray~_data
    *  @private
    *  @type {Object}
    *  @since 1.0.0
    */
    this._data = {};
    this.import(data);
  }

  /**
  *  Getter/setter for the root data of ObjectArray.
  *
  *  @alias ObjectArray~data
  *  @type  Object
  *  @since 1.0.0
  *  @version 1.0.0
  *  @author Liqueur de Toile <contact@liqueurdetoile.com>
  */


  _createClass(ObjectArray, [{
    key: 'length',


    /**
    *  Returns length of a given dataset in the ObjectArray
    *  If no parent key is provided, it will output the length of
    *  the root data object
    *
    *  @method ObjectArray~length
    *  @since 1.0.0
    *  @version 1.0.0
    *  @author Liqueur de Toile <contact@liqueurdetoile.com>
    *
    *  @param {dottedKey} pKey  Parent key
    *  @returns  {Number|undefined} Length of the dataset or undefined if key doesn't exist
    */
    value: function length(pKey) {
      var data = this.keys(pKey);

      if (!data) return undefined;
      return this.keys(pKey).length;
    }

    /**
    *  Returns keys of a given dataset in the ObjectArray
    *  If no parent key is provided, it will output the keys of
    *  the root data object
    *
    *  @method ObjectArray~keys
    *  @since 1.0.0
    *  @version 1.0.0
    *  @author Liqueur de Toile <contact@liqueurdetoile.com>
    *
    *  @param {dottedKey} pKey  Parent key
    *  @returns  {Array|undefined} Array of keys for the dataset
    *  or undefined if key doesn't exist
    */

  }, {
    key: 'keys',
    value: function keys(pKey) {
      var keys = [],
          data = this.dataset(pKey);

      if (!data) return undefined;
      for (var key in data) {
        keys.push(key);
      }return keys;
    }

    /**
    *  Returns values of a given dataset in the ObjectArray
    *  If no parent key is provided, it will output the keys of
    *  the root data object
    *
    *  @method ObjectArray~values
    *  @since 1.0.0
    *  @version 1.0.0
    *  @author Liqueur de Toile <contact@liqueurdetoile.com>
    *
    *  @param {dottedKey} pKey  Parent key
    *  @returns  {Array|undefined} Array of values for the dataset
    *  or undefined if key doesn't exist
    */

  }, {
    key: 'values',
    value: function values(pKey) {
      var values = [],
          data = this.dataset(pKey);

      if (!data) return undefined;
      for (var key in data) {
        values.push(data[key]);
      }return values;
    }

    /**
    *  Check if a given key exists in the ObjectArray
    *
    *  @alias ObjectArray~has
    *  @type Array
    *  @since 1.0.0
    *  @version 1.0.0
    *  @author Liqueur de Toile <contact@liqueurdetoile.com>
    *
    *  @param {dottedKey}  key Key
    *  @returns {Boolean}  true if key exists, false otherwise
    */

  }, {
    key: 'has',
    value: function has(key) {
      var i = void 0,
          k = void 0,
          data = this.data;

      key = key.split('.');
      for (i = 0; i < key.length; i++) {
        k = key[i];

        if (typeof data[k] === 'undefined') return false;
        data = data[k];
      }
      return true;
    }

    /**
    *  Returns dataset for the key. If no key is provided,
    *  the whole data is returned
    *
    *  @alias ObjectArray~dataset
    *  @type Object
    *  @since 1.0.0
    *  @version 1.0.0
    *  @author Liqueur de Toile <contact@liqueurdetoile.com>
    *
    *  @param {dottedKey}  [key=null] Key
    *  @returns {Object|undefined} Data object or undefined if key doesn't exist
    */

  }, {
    key: 'dataset',
    value: function dataset(key) {
      var i = void 0,
          k = void 0,
          data = this.data;

      if (key !== undefined) {
        key = key.split('.');
        for (i = 0; i < key.length; i++) {
          k = key[i];

          if (typeof data[k] === 'undefined') return undefined;
          data = data[k];
        }
      }
      return data;
    }

    /**
    *  Returns the parent key for a given key
    *
    *  @alias ObjectArray~parentKey
    *  @type Array
    *  @since 1.0.0
    *  @version 1.0.0
    *  @author Liqueur de Toile <contact@liqueurdetoile.com>
    *
    *  @param {dottedKey}  key Key
    *  @returns {String} Parent key
    */

  }, {
    key: 'parentKey',
    value: function parentKey(key) {
      if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) !== undefined) {
        key = key.split('.');
        key.pop();

        if (key.length) {
          key = key.join('.');
          return key;
        }
      }
      return undefined;
    }

    /**
    *  Push a new key/value pair
    *
    *  @method ObjectArray~push
    *  @since 1.0.0
    *  @version 1.0.0
    *  @author Liqueur de Toile <contact@liqueurdetoile.com>
    *
    *  @param {dottedKey} key Key of the added item
    *  @param {Number|String|Array|Object} val Value of the added item
    *  @param {dottedKey}  [pKey]  Parent key to push into
    *  @returns {ObjectArray} Return self for chaining
    */

  }, {
    key: 'push',
    value: function push(key, val, pKey) {
      var k = void 0,
          data = this.dataset(pKey);

      key = key.split('.');
      k = key.pop();
      key.forEach(function (k, i) {
        if (typeof data[k] === 'undefined') data[k] = {};
        data = data[k];
      });
      data[k] = val;
      return this;
    }

    /**
    *  Remove key/value pair
    *
    *  @method ObjectArray~remove
    *  @since 1.0.0
    *  @version 1.0.0
    *  @author Liqueur de Toile <contact@liqueurdetoile.com>
    *
    *  @param {dottedKey} key Key of the added item
    *  @returns {ObjectArray} Return self for chaining
    */

  }, {
    key: 'remove',
    value: function remove(key) {
      var pKey = this.parentKey(key);
      var data = this.dataset(pKey);

      if (data) {
        key = key.replace(pKey + '.', '');
        delete data[key];
      }
      return this;
    }

    /**
    *  Import an object as data into the ObjectArray
    *
    *  @method ObjectArray~import
    *  @since 1.0.0
    *  @version 1.0.0
    *  @author Liqueur de Toile <contact@liqueurdetoile.com>
    *
    *  @param {Object} Data Object to import
    *  @param {dottedKey}  [pKey]  Dotted parent key to import into
    *  @returns {ObjectArray} Return self for chaining
    */

  }, {
    key: 'import',
    value: function _import(data, pKey) {
      for (var key in data) {
        this.push(key, data[key], pKey);
      }return this;
    }

    /**
    *  Runs a callback on each ObjectArray entry
    *
    *  @method ObjectArray~forEach
    *  @since 1.0.0
    *  @version 1.0.0
    *  @author Liqueur de Toile <contact@liqueurdetoile.com>
    *
    *  @param {forEachCallback} cb Callback to be run
    *  @param {dottedKey}  [key]  Dotted key to limit iterations through its subset
    *  if empty, the global data object will be used
    *  @returns {void}
    */

  }, {
    key: 'forEach',
    value: function forEach(cb, key) {
      var data = this.dataset(key);
      var index = 0;

      for (var _key in data) {
        cb.call(this, data[_key], _key, index++);
      }
    }

    /**
    *  Reduce the ObjectArray data given a callback
    *
    *  @method ObjectArray~reduce
    *  @since 1.0.0
    *  @version 1.0.0
    *  @author Liqueur de Toile <contact@liqueurdetoile.com>
    *
    *  @param   {Callback}  reducer   Callback to apply to each key/value (from left)
    *  @param   {Mixed}     [start]   Initial value for iteration
    *  @param {dottedKey}  [key]  Dotted key to limit iterations through its subset
    *  if empty, the global data object will be used
    *  @returns {Mixed}               Callback returns value
    */

  }, {
    key: 'reduce',
    value: function reduce(reducer, start, key) {
      var acc = start;

      this.forEach(function (value, k) {
        acc = reducer(acc, value, k);
      }, key);
      return acc;
    }

    /**
    *  Returns a string suitable for a <tt>style</tt> attribute.
    *
    *  @method ObjectArray~styleString
    *  @since 1.0.0
    *  @version 1.0.0
    *  @author Liqueur de Toile <contact@liqueurdetoile.com>
    *
    *  @param {dottedKey}  [key]  Dotted key to limit iterations through its subset
    *  if empty, the global data object will be used
    *  @returns {String}  style string
    */

  }, {
    key: 'styleString',
    value: function styleString(key) {
      var ret = this.reduce(function (str, value, k) {
        str += k + ':' + value + ';';
        return str;
      }, '', key);

      return ret.substr(0, ret.length - 1);
    }

    /**
    *  Returns a string suitable for a URI query string
    *
    *  @method ObjectArray~urlEncode
    *  @since 1.0.0
    *  @version 1.0.0
    *  @author Liqueur de Toile <contact@liqueurdetoile.com>
    *
    *  @param {dottedKey}  [key]  Dotted key to limit iterations through its subset
    *  if empty, the global data object will be used
    *  @returns {String}  style string
    */

  }, {
    key: 'urlEncode',
    value: function urlEncode(key) {
      var ret = this.reduce(function (str, value, key) {
        str += key + '=' + encodeURIComponent(value) + '&';
        return str;
      }, '', key);

      return ret.substr(0, ret.length - 1);
    }

    /**
    *  Returns a string suitable for a <tt>form-url-encoded</tt> query string
    *
    *  @method ObjectArray~formUrlEncode
    *  @since 1.0.0
    *  @version 1.0.0
    *  @author Liqueur de Toile <contact@liqueurdetoile.com>
    *
    *  @param {dottedKey}  [key]  Dotted key to limit iterations through its subset
    *  if empty, the global data object will be used
    *  @returns {String}  style string
    */

  }, {
    key: 'formUrlEncode',
    value: function formUrlEncode(key) {
      var ret = this.urlEncode(key);

      return ret.replace('%20', '+');
    }
  }, {
    key: 'data',
    get: function get() {
      return this._data;
    },
    set: function set(data) {
      this.import(data);
    }
  }]);

  return ObjectArray;
}();

exports.default = ObjectArray;


if (window) window.ObjectArray = ObjectArray;

/**
*  @typedef dottedKey
*  @type String
*  @description
*  A dotted key is useful to quickly access a subset of data
*  stored into the ObjectArray as if it was still a
*  vanilla <tt>Object</tt>.
*  @example
*  // Create an ObjectArray with subdata
*  var oa = new ObjectArray({
*    set1: {
*      subset1: 'foo',
*      subset2: {
*        subsub1: 'bar',
*        subsub2: 'baz'
*      }
*    }
*  });
*  // 'set1.subset1' will yield to 'foo'
*  // 'set1.subset1.subsub2' will yield to 'baz'
*
*/

/***/ })
/******/ ]);
});
//# sourceMappingURL=objectarray.js.map