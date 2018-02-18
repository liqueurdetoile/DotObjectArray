/**
*  @file ObjectArray class declaration
*  @author  Liqueur de Toile <contact@liqueurdetoile.com>
*  @license MIT {@link https://choosealicense.com/licenses/mit/}
*  @see [Github]{@link https://github.com/liqueurdetoile/objectarray}
*  @see [Author website]{@link https://liqueurdetoile.com}
*/

/**
*  @classDesc
*  The ObjectArray class implements array-like properties and methods to
*  a key/value javascript object.
*  
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

export default class ObjectArray {
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
  *  Getter/setter for the root data of ObjectArray.
  *
  *  @alias ObjectArray~data
  *  @type  Object
  *  @since 1.0.0
  *  @version 1.0.0
  *  @author Liqueur de Toile <contact@liqueurdetoile.com>
  */
  get data() {
    return this._data;
  }
  
  set data(data) {
    this.import(data);
  }

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
  *  @returns  {Number} Length of the dataset
  */
  length(pKey) {
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
  *  @returns  {Number} Length of the dataset
  */
  keys(pKey) {
    let keys = [];

    for (let key in this.dataset(pKey)) keys.push(key);
    return keys;
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
  *  @returns  {Number} Length of the dataset
  */
  values(pKey) {
    let values = [], data = this.dataset(pKey);

    for (let key in data) values.push(data[key]);
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
  *  @param {dottedKey}  key Key
  *  @returns {Array} Array of ObjectArray values
  */
  has(key) {
    let i, k, data = this.data;

    key = key.split('.');
    for (i = 0; i < key.length; i++) {
      k = key[i];
      /* istanbul ignore else  */
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
  *  @returns {Object} Data object
  */
  dataset(key) {
    let i, k, data = this.data;

    /* istanbul ignore else  */
    if (key !== undefined) {
      key = key.split('.');
      for (i = 0; i < key.length; i++) {
        k = key[i];
        /* istanbul ignore else  */
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
  parentKey(key) {
    if(typeof key !== undefined) {
      key = key.split('.');
      key.pop();
      /* istanbul ignore else  */
      if(key.length) {
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
  push(key, val, pKey) {
    let k, data = this.dataset(pKey);

    key = key.split('.');
    k = key.pop();
    key.forEach(function (k, i) {
      /* istanbul ignore else  */
      if (!data[k]) data[k] = {};
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
  remove(key) {    
    let pKey = this.parentKey(key);
    let data = this.dataset(pKey);

    /* istanbul ignore else  */
    if(data) {
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
  import(data, pKey) {
    for (let key in data) this.push(key, data[key], pKey);
    return this;
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
  forEach(cb, key) {
    let data = this.dataset(key);
    let index = 0;

    for (let key in data) cb.call(this, data[key], key, index++);
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
  reduce(reducer, start, key) {
    var acc = start;

    this.forEach(function (value, k) { acc = reducer(acc, value, k); }, key);
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
  styleString(key) {
    let ret = this.reduce(function (str, value, k) {
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
  urlEncode(key) {
    let ret = this.reduce(function (str, value, key) {
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
  formUrlEncode(key) {
    let ret = this.urlEncode(key);

    return ret.replace('%20', '+');
  }
}

if(window) window.ObjectArray = ObjectArray;

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
