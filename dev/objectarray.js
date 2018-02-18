/******/ (function(modules) { // webpackBootstrap
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
*  @file ObjectArray class declaration
*  @author  Liqueur de Toile <contact@liqueurdetoile.com>
*  @license Apache-2.0 {@link https://www.apache.org/licenses/LICENSE-2.0}
*/

/**
*  @classDesc
*  The ObjectArray class implements array-like properties and methods to
*  a key/value javascript object.
*  
*  It can be viewed as a kind of associative array in JS.
*
*  @class ObjectArray
*  @since 1.0.0
*  @version 1.0.0
*  @author Liqueur de Toile <contact@liqueurdetoile.com>
*
*  @param   {Object}    data
*
*  @returns {ObjectArray} ObjectArray object
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
  *  Returns length of the ObjectArray
  *
  *  @alias ObjectArray~length
  *  @type  Number
  *  @since 1.0.0
  *  @version 1.0.0
  *  @author Liqueur de Toile <contact@liqueurdetoile.com>
  *
  *  @returns {Number} Length of the ObjectArray
  */


  _createClass(ObjectArray, [{
    key: 'has',


    /**
    *  Check if a given key exists in the ObjectArray
    *
    *  @alias ObjectArray~has
    *  @type Array
    *  @since 1.0.0
    *  @version 1.0.0
    *  @author Liqueur de Toile <contact@liqueurdetoile.com>
    *
    *  @param {String}  key Key
    *  @returns {Array} Array of ObjectArray values
    */
    value: function has(key) {
      var i = void 0,
          k = void 0,
          data = this._data;

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
    *  @alias ObjectArray~data
    *  @type Array
    *  @since 1.0.0
    *  @version 1.0.0
    *  @author Liqueur de Toile <contact@liqueurdetoile.com>
    *
    *  @param {String}  [key=null] Key
    *  @returns {Array} Array of ObjectArray values
    */

  }, {
    key: 'data',
    value: function data() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      var i = void 0,
          k = void 0,
          data = this._data;

      if (key !== null) {
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
    *  Runs a callback on each ObjectArray entry
    *
    *  @method ObjectArray~forEach
    *  @since 1.0.0
    *  @version 1.0.0
    *  @author Liqueur de Toile <contact@liqueurdetoile.com>
    *
    *  @param {forEachCallback} cb Callback to be run
    *  @param {String}  [key=null]  Dotted key to limit iterations through its subset
    *  @returns {void}
    */

  }, {
    key: 'forEach',
    value: function forEach(cb) {
      var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var data = this.data(key);
      var index = 0;

      for (var _key in data) {
        cb.call(this, data[_key], _key, index++);
      }
    }

    /**
    *  Push a new key/value pair at the end of the ObjectArray
    *
    *  @method ObjectArray~push
    *  @since 1.0.0
    *  @version 1.0.0
    *  @author Liqueur de Toile <contact@liqueurdetoile.com>
    *
    *  @param {String} key Key of the added item
    *  @param {Number|String|Array|Object} val Value of the added item
    *  @returns {ObjectArray} Return self for chaining
    */

  }, {
    key: 'push',
    value: function push(key, val) {
      var path = this._data;

      key = key.split('.');
      key.forEach(function (k, i) {
        if (i < key.length - 1) {
          if (!path[k]) path[k] = {};
          path = path[k];
        } else path[k] = val;
      });
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
    *  @param {String} key Key of the added item
    *  @returns {ObjectArray} Return self for chaining
    */

  }, {
    key: 'remove',
    value: function remove(key) {
      var path = this._data;

      key = key.split('.');
      key.forEach(function (k, i) {
        if (i < key.length - 1) {
          if (!path[k]) path[k] = {};
          path = path[k];
        } else delete path[k];
      });
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
    *  @returns {ObjectArray} Return self for chaining
    */

  }, {
    key: 'import',
    value: function _import(data) {
      for (var key in data) {
        this.push(key, data[key]);
      }return this;
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
    *  @returns {Mixed}               Callback returns value
    */

  }, {
    key: 'reduce',
    value: function reduce(reducer, start) {
      var acc = start;

      this.forEach(function (value, key) {
        acc = reducer(acc, value, key);
      });
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
    *  @returns {String}  style string
    */

  }, {
    key: 'styleString',
    value: function styleString() {
      var ret = this.reduce(function (str, value, key) {
        str += key + ':' + value + ';';
        return str;
      }, '');

      return ret.substr(0, ret.length - 1);
    }
  }, {
    key: 'urlEncode',
    value: function urlEncode() {
      var ret = this.reduce(function (str, value, key) {
        str += key + '=' + encodeURIComponent(value) + '&';
        return str;
      }, '');

      return ret.substr(0, ret.length - 1);
    }
  }, {
    key: 'formUrlEncode',
    value: function formUrlEncode() {
      var ret = this.urlEncode();

      return ret.replace('%20', '+');
    }
  }, {
    key: 'length',
    get: function get() {
      return this.keys.length;
    }

    /**
    *  Returns keys of the ObjectArray
    *
    *  @alias ObjectArray~keys
    *  @type Array
    *  @since 1.0.0
    *  @version 1.0.0
    *  @author Liqueur de Toile <contact@liqueurdetoile.com>
    *
    *  @returns {Array} Array of ObjectArray keys
    */

  }, {
    key: 'keys',
    get: function get() {
      var keys = [];

      for (var key in this._data) {
        keys.push(key);
      }return keys;
    }

    /**
    *  Returns values of the ObjectArray
    *
    *  @alias ObjectArray~values
    *  @type Array
    *  @since 1.0.0
    *  @version 1.0.0
    *  @author Liqueur de Toile <contact@liqueurdetoile.com>
    *
    *  @returns {Array} Array of ObjectArray values
    */

  }, {
    key: 'values',
    get: function get() {
      var values = [];

      for (var key in this._data) {
        values.push(this._data[key]);
      }return values;
    }
  }]);

  return ObjectArray;
}();

exports.default = ObjectArray;

/***/ })
/******/ ]);
//# sourceMappingURL=objectarray.js.map