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

class ObjectArray {
  constructor(data = {}) {
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
  get length() {
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
  get keys() {
    let keys = [];

    for (let key in this._data) keys.push(key);
    return keys;
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
  get values() {
    let values = [];

    for (let key in this._data) values.push(this._data[key]);
    return values;
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
  *  @param {String}  key Key
  *  @returns {Array} Array of ObjectArray values
  */
  has(key) {
    let i, k, data = this._data;

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
  data(key = null) {
    let i, k, data = this._data;

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
  forEach(cb, key = null) {
    let data = this.data(key);
    let index = 0;

    for (let key in data) cb.call(this, data[key], key, index++);
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
  push(key, val) {
    let path = this._data;

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
  remove(key) {
    let path = this._data;

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
  import(data) {
    for (let key in data) this.push(key, data[key]);
    return this;
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
  reduce(reducer, start) {
    var acc = start;

    this.forEach(function (value, key) { acc = reducer(acc, value, key); });
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
  styleString() {
    let ret = this.reduce(function (str, value, key) {
      str += key + ':' + value + ';';
      return str;
    }, '');

    return ret.substr(0, ret.length - 1);
  }

  urlEncode() {
    let ret = this.reduce(function (str, value, key) {
      str += key + '=' + encodeURIComponent(value) + '&';
      return str;
    }, '');

    return ret.substr(0, ret.length - 1);
  }

  formUrlEncode() {
    let ret = this.urlEncode();

    return ret.replace('%20', '+');
  }
}

export default ObjectArray;
