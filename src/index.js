/**
*  @file dot-object-array module
*  @author  Liqueur de Toile <contact@liqueurdetoile.com>
*  @license MIT {@link https://choosealicense.com/licenses/mit/}
*  @see [Github]{@link https://github.com/liqueurdetoile/objectarray}
*  @see [Author website]{@link https://liqueurdetoile.com}
*/

/**
*  Implements array-like properties and
*  methods to a key/value javascript object.
*  It can be viewed as a kind of associative array in JS but it also
*  supports dot notation keys.
*
*  @module dot-object-array
*  @author Liqueur de Toile <contact@liqueurdetoile.com>
*  @license MIT {@https://github.com/liqueurdetoile/DotObjectArray/blob/master/LICENSE}
*/

export class ObjectArray {
  /**
  *  @param {Object}  [data={}] Initial data to import
  *  @example
  *  var doa = new ObjectArray();
  *  var doa = new ObjectArray({
  *   key1: value1,
  *   key2: value2
  *  });
  *
  *  @returns {ObjectArray} Instance of ObjectArray
  */

  constructor(data = {}) {
    /**
    *  The inner data object
    *
    *  @type {Object}
    *  @since 1.0.0
    */
    this._data = {};

    /**
    *  Global switcher for defining if ObjectArray should return undefined
    *  or throw an exception when an undefined key is requested.
    *
    *  It is not set at ObjectArray initialization.
    *
    *  @type {boolean}
    *  @since 3.0.0
    */
    this._throw = undefined;

    /**
    *  Global memorizer for automated working on a subset.
    *
    *  It defaults to false.
    *
    *  @type {boolean}
    *  @since 3.0.0
    */
    this._pKey = undefined;

    // import data
    this.import(data);
  }

  /**
  *  Returns the underlying `_data` object for raw reading
  *
  *  @type  {Object}
  *  @see {@link _data}
  *  @since 1.0.0
  */
  get data() {
    return this._data;
  }

  /**
  *  Import data into ObjectArray.
  *
  *  This setter is an alias to {@link import} method.
  *
  *  @param {Object} data Data to import
  */
  set data(data) {
    this.import(data);
  }

  /**
  *  Overrides all throwable params settings of the object array
  *
  *  You can revert back to no effect by setting it to `undefined`
  *
  *  @since 3.0.0
  *  @version 1.0.0
  *  @author Liqueur de Toile <contact@liqueurdetoile.com>
  *
  *  @param {Boolean|undefined} v
  *  Set to :
  *  - `true` to enable always throwing behaviour
  *  - `false` to enable always returning `undefined`
  *  - `undefined` to revert to a per method behaviour setting
  *
  *  @returns {ObjectArray} Chainable
  */
  throwing(v) {
    this._throw = v;
    return this;
  }

  /**
  *  Set the parent key global memorizer. it works like
  *  giving a pKey argument to methods
  *
  *  @since 3.0.0
  *  @version 1.0.0
  *  @author Liqueur de Toile <contact@liqueurdetoile.com>
  *
  *  @param {dottedKey} pKey Parent key to define working subset
  *  @returns {ObjectArray} Chainable
  */
  pKey(pKey) {
    this._pKey = pKey;
    return this;
  }

  /**
  *  Returns a joined dotted key from key and parent key.
  *
  *  If not parent key is provided, it will try to use global
  *  parent key memorizer
  *
  *  If the global _throw trigger is set, it will overrides
  *  any throwable parameter. Use it with care !
  *
  *  @since 2.0.0
  *  @version 2.0.0
  *  @author Liqueur de Toile <contact@liqueurdetoile.com>
  *
  *  @param {dottedKey}   key     Key
  *  @param {dottedKey}   [pKey]  Parent key
  *  @param {boolean}     [throwable]  Wether to trigger an exception if key doesn't exist
  *  @returns {dottedKey}
  *  Joined dotted key
  *  @throws  {TypeError}
  *  If key does not exist and throwable set to `true` or global _throw set to `true`
  *  @see {@link pKey}
  *  @see {@link throwing}
  */
  _key(key, pKey, throwable) {
    pKey = pKey || this._pKey;
    throwable = (typeof this._throw !== 'undefined') ? this._throw : throwable;

    if (pKey) key = pKey + '.' + key;
    if (this.has(key)) return key;
    if (throwable) {
      throw new TypeError('Inexistent key, key : ' + key + ', Parent key : ' + pKey);
    } else return undefined;
  }

  /**
  *  Returns a clone with same data of the current ObjectArray
  *
  *  @since 1.3.0
  *  @version 1.0.0
  *  @author Liqueur de Toile <contact@liqueurdetoile.com>
  *
  *  @param {Boolean} [keepFlattened=true]
  *  If true, the flattened dotted keys will remains flattened
  *  otherwise, the full hierarchy will be restored
  *  @returns {this} Chainable
  */
  clone(keepFlattened = true) {
    let o = new ObjectArray();

    if (keepFlattened) o._data = this._data;
    else o.import(this._data);
    return o;
  }

  /**
  *  Empty the ObjectArray data. It can also be used as
  *  an alias for {@link ObjectArray~remove}
  *
  *  @since 1.2.0
  *  @version 3.0.0
  *  @author Liqueur de Toile <contact@liqueurdetoile.com>
  *
  *  @param {dottedKey} key  Key to remove
  *  @param {dottedKey}  [pKey] Parent key
  *  @param {boolean} [throwable=true] Wether to throw an exception if key doesn't exist
  *  @returns {this} Chainable
  *  @throws  {TypeError} If key does not exist
  */
  empty(key, pKey, throwable = true) {
    if (typeof key === 'undefined') this._data = {};
    else this.remove(key, pKey, throwable);
    return this;
  }

  /**
  *  Returns length of a given dataset in the ObjectArray
  *  If no key is provided, it will output the length of
  *  the root data object
  *
  *  @since 1.0.0
  *  @version 3.0.0
  *  @author Liqueur de Toile <contact@liqueurdetoile.com>
  *
  *  @param {dottedKey} key  Key
  *  @param {dottedKey}  [pKey] Parent key
  *  @param {boolean} [throwable=true] Wether to throw an exception if key doesn't exist
  *  @returns  {Number|undefined} Length of the dataset
  *  @throws  {TypeError} If key does not exist
  */
  length(key, pKey, throwable = true) {
    let l = this.keys(key, pKey, throwable).length;

    if (l === 0 && key) return undefined;
    return l;
  }

  /**
  *  Returns keys of a given dataset in the ObjectArray
  *  If no key is provided, it will output the keys of
  *  the root data object
  *
  *  @since 1.0.0
  *  @version 3.0.0
  *  @author Liqueur de Toile <contact@liqueurdetoile.com>
  *
  *  @param {dottedKey} key  Key
  *  @param {dottedKey}  [pKey] Parent key
  *  @param {boolean} [throwable=true] Wether to throw an exception if key doesn't exist
  *  @returns  {Array} Array of keys for the dataset
  *  or empty array if key is not defined
  *  @throws  {TypeError} If key does not exist
  */
  keys(key, pKey, throwable = true) {
    let keys = [], data;

    if (typeof key === 'undefined') data = this._data;
    else data = this.dataset(key, pKey, throwable);
    for (let k in data) keys.push(k);
    return keys;
  }

  /**
  *  Returns values of a given dataset in the ObjectArray
  *  If no key is provided, it will output the values of
  *  the root data object
  *
  *  @since 1.0.0
  *  @version 3.0.0
  *  @author Liqueur de Toile <contact@liqueurdetoile.com>
  *
  *  @param {dottedKey} key  Key
  *  @param {dottedKey}  [pKey] Parent key
  *  @param {boolean} [throwable=true] Wether to throw an exception if key doesn't exist
  *  @returns  {Array} Array of values for the dataset
  *  or empty array if key is not defined
  *  @throws  {TypeError} If key does not exist
  */
  values(key, pKey, throwable = true) {
    let values = [], data;

    if (typeof key === 'undefined') data = this._data;
    else data = this.dataset(key, pKey, throwable);
    for (let k in data) values.push(data[k]);
    return values;
  }

  /**
  *  Check if a given key exists in the ObjectArray
  *
  *  @since 1.0.0
  *  @version 1.1.1
  *  @author Liqueur de Toile <contact@liqueurdetoile.com>
  *
  *  @param {dottedKey}  key Key
  *  @param {dottedKey}  [pKey] Parent key
  *  @returns {Boolean}  true if key exists, false otherwise
  */
  has(key, pKey) {
    let i, k, data = this._data;

    if (typeof key === 'undefined') return false;
    if (pKey) key = pKey + '.' + key;

    key = key.split('.');
    for (i = 0; i < key.length; i++) {
      k = key[i];

      if (typeof data[k] === 'undefined') return false;
      data = data[k];
    }
    return true;
  }

  /**
  *  Check the value for a given key in the ObjectArray
  *
  *  @since 2.0.0
  *  @version 1.0.0
  *  @author Liqueur de Toile <contact@liqueurdetoile.com>
  *
  *  @param {dottedKey}  key Key
  *  @param {Number|String|Array|Object} val Value
  *  @param {dottedKey}  [pKey] Parent key
  *  @param {boolean} [strict=true]  `true` to perform a strict comparison
  *  (`===`) or false otherwise
  *  @returns {Boolean}  true if key exists and is equal to val
  */
  check(key, val, pKey, strict = true) {
    /* istanbul ignore else */
    if (this.has(key, pKey)) {
      let v = this.pull(key, pKey);

      if (strict) return val === v;
      else return val == v; //eslint-disable-line
    }
    /* istanbul ignore next */
    return false;
  }

  /**
  *  Returns dataset for the key. If no key is provided,
  *  the whole dataset is returned
  *
  *  @since 1.0.0
  *  @version 2.0.0
  *  @author Liqueur de Toile <contact@liqueurdetoile.com>
  *
  *  @param {dottedKey}  [key] Key
  *  @param {dottedKey}  [pKey] Parent Key
  *  @param {boolean} [throwable=false] Wether to throw an exception if key doesn't exist
  *  @returns {Object|undefined} Data object
  *  @throws  {TypeError} If key does not exist
  */
  dataset(key, pKey, throwable = false) {
    let i, k, data = this.data;

    if (typeof key === 'undefined') return data;

    key = this._key(key, pKey, throwable);

    if (typeof key !== 'undefined') {
      key = key.split('.');
      for (i = 0; i < key.length; i++) {
        k = key[i];
        data = data[k];
      }
      return data;
    }
    return undefined;

  }

  /**
  *  Alias for {@link dataset} method.
  *
  *  @since 1.4.0
  *  @version 2.0.0
  *  @author Liqueur de Toile <contact@liqueurdetoile.com>
  *
  *  @param {dottedKey}  [key] Key
  *  @param {dottedKey}  [pKey] Parent Key
  *  @param {boolean} [throwable=false] Wether to throw an exception if key doesn't exist
  *  @returns {Object|undefined} Data object
  *  @throws  {TypeError} If key does not exist
  *  @see {@link dataset}
  */
  pull(key, pKey, throwable = false) {
    return this.dataset(key, pKey, throwable);
  }

  /**
  *  Shortcut for getter/setter syntax. It can also be used
  *  to import data.
  *
  *  @example
  *  // Getter mode
  *  i.getset(); // returns all data
  *  i.getset('a'); // returns data for key a
  *  i.getset('c'); // will throw a TypeError exception if key c doesn't exist
  *  i.getset('c', undefined, '', false) // returns undefined
  *  // Better use
  *  i.pull('c', '', false); // returns undefined
  *
  *  // Setter mode
  *  i.getset('a', 'valueA'); // Set 'valueA' to key a
  *  i.getset('b', 'valueB', 'a'); // set 'valueB' to key a.b
  *
  *  // Import mode
  *  i.getset({a: 'valueA', 'a.b': 'valueB'}); // Import key/values at root level
  *  i.getset({'b', 'valueB'}, 'a'); // Import key/values at key a
  *
  *  @since 2.1.0
  *  @version 1.0.1
  *  @author Liqueur de Toile <contact@liqueurdetoile.com>
  *
  *  @param {dottedKey|Object}  [key] Key / Object to import
  *  @param {number|string|array|object|dottedKey} [val] Value to push / Parent key to import into
  *  @param {dottedKey}  [pKey] Parent Key
  *  @param {boolean}    [throwable=true] If `true`, getset will throw
  *  an exception if key doesn't exist in getter mode else it will return `undefined`
  *  @returns {GetSetObject}  getset return
  *  @throws  {TypeError} If key does not exist and throwable is `true`
  */
  getset(key, val, pKey, throwable = true) {
    let ret = {
      'set': false
    };

    if (typeof key === 'undefined') ret['get'] = this.pull(pKey, null, throwable);
    else if (typeof key === 'string') {
      if (typeof val === 'undefined') ret['get'] = this.pull(key, pKey, throwable);
      else {
        ret['set'] = true;
        this.push(key, val, pKey);
      }
    } else {
      ret['set'] = true;
      this.import(key, val);
    }

    return ret;
  }

  /**
  *  Returns e level up key for a given dotted key
  *
  *  @since 1.0.0
  *  @version 1.0.1
  *  @author Liqueur de Toile <contact@liqueurdetoile.com>
  *
  *  @param {dottedKey}  key Key
  *  @returns {String} Parent key
  */
  parentKey(key) {
    if (typeof key !== 'undefined') {
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
  *  Returns the delevl down key for a given dotted key
  *
  *  @since 1.3.0
  *  @version 1.0.0
  *  @author Liqueur de Toile <contact@liqueurdetoile.com>
  *
  *  @param {dottedKey}  key Key
  *  @returns {String}  Child key
  */
  childKey(key) {
    if (typeof key !== 'undefined') {
      key = key.split('.');
      key.shift();

      if (key.length) {
        key = key.join('.');
        return key;
      }
    }
    return undefined;
  }

  /**
  *  Private method to recurse flatten
  *
  *  @private
  *  @since 1.3.0
  *  @version 1.0.0
  *  @author Liqueur de Toile <contact@liqueurdetoile.com>
  *
  *  @param {Object}    ret     Object to complete
  *  @param {Boolean}   dotted  Should the new key be dotted or not
  *  @param {dottedKey} pKey    Parent key defining current subdataset
  *  @returns {Object}  Completed result with non-object data
  */
  _recurseFlatten(ret, dotted, pKey) {
    let k, data = this.dataset(pKey);

    for (let key in data) {
      if (typeof data[key] === 'object') this._recurseFlatten(ret, dotted, pKey ? pKey + '.' + key : key);
      else {
        // Correct key for root key or subdataset key
        pKey = (this.childKey(pKey)) ? this.childKey(pKey) : pKey;
        k = (dotted && pKey) ? pKey + '.' + key : key;
        ret[k] = data[key];
      }
    }
    return ret;
  }

  /**
  *  Flattens the object and replace data.
  *
  *  Each object in the dataset is
  *  recursively explored to extract data and bring it a top level.
  *
  *  With default behaviour, if two or more properties have same name under
  *  subkeys, the last explored one will replace the previous one.
  *
  *  If the method is called with `true` as first parameter, the
  *  resulting data keys will be dotted, preventing duplication. In that case,
  *  you must access new keys with `dataset` method or by calling
  *  the `data` key property with [] (e.g. doa.data['my.key']);
  *
  *  Flatten may be run on a subdataset by providing a key as second parameter.
  *
  *  @since 1.3.0
  *  @version 2.0.0
  *  @author Liqueur de Toile <contact@liqueurdetoile.com>
  *
  *  @param {Boolean} [dotted = false]
  *  @param {dottedKey}  [key]  Key to flatten. If not provided, the whole
  *  dataset will flattened.
  *  @returns {this} Chainable
  *  @throws  {TypeError} If key does not exist
  */
  flatten(dotted = false, key) {
    let data;

    if (typeof key === 'undefined') data = this._recurseFlatten({}, dotted);
    else if (this.has(key)) data = this._recurseFlatten({}, dotted, key);
    else throw new TypeError('Inexistent key, key : ' + key);

    if (typeof key === 'undefined') this._data = data;
    else this.push(key, data);
    return this;
  }

  /**
  *  Push a new key/value pair
  *
  *  @since 1.0.0
  *  @version 1.1.0
  *  @author Liqueur de Toile <contact@liqueurdetoile.com>
  *
  *  @param {dottedKey} key Key of the added item
  *  @param {Number|String|Array|Object} val Value of the added item
  *  @param {dottedKey}  [pKey]  Parent key to push into
  *  @returns {this} Chainable
  *  @throws {TypeError} If key or parent key are not a string
  */
  push(key, val, pKey) {
    let k, data;

    pKey = pKey || this._pKey;
    if (typeof key !== 'string') throw new TypeError('Key must be a string');
    if (pKey && typeof pKey !== 'string') throw new TypeError('Parent key must be a string');

    // Check pKey existence
    if (this.has(pKey) || typeof pKey === 'undefined') {
      data = this.dataset(pKey);
    } else {
      key = pKey + '.' + key;
      data = this.data;
    }

    key = key.split('.');
    k = key.pop();
    key.forEach(function (k, i) {
      if (typeof data[k] === 'undefined') data[k] = {};
      data = data[k];
    });
    if (val instanceof ObjectArray) val = val._data;
    data[k] = val;
    return this;
  }

  /**
  *  Coalesce method to define a default value if a key is not set.
  *
  *  Never use if you want to store `undefined` as values.
  *
  *  __This method is obviously useless if the ObjectArray is set
  *  to throw an exception when encountering an undefined key__
  *
  *  @since 3.1.0
  *  @version 1.0.0
  *  @author Liqueur de Toile <contact@liqueurdetoile.com>
  *
  *  @param {dottedKey} key Key to define
  *  @param {Number|String|Array|Object} val Default value for the key
  *  @param {dottedKey} [pKey] Description for pKey
  *
  *  @returns {this} Chainable
  */
  define(key, val, pKey) {
    let v = this.pull(key, pKey);

    if (typeof v === 'undefined') return this.push(key, val, pKey);
    return this;
  }

  /**
  *  Remove key/value data
  *
  *  @since 1.1.0
  *  @version 2.0.0
  *  @author Liqueur de Toile <contact@liqueurdetoile.com>
  *
  *  @param {dottedKey} key Key of the added item
  *  @param {dottedKey}  [pKey]  Parent key
  *  @param {boolean} [throwable=true] Wether to throw an exception if key doesn't exist
  *  @returns {this} Chainable
  *  @throws  {TypeError} If key does not exist
  */
  remove(key, pKey, throwable = true) {
    let p, data;

    key = this._key(key, pKey, throwable);
    p = this.parentKey(key);
    if (typeof p === 'undefined') {
      if (typeof key === 'undefined') return this; // Unknown key

      delete this._data[key]; // root key
      return this;
    }

    data = this.dataset(p);

    /* istanbul ignore else */
    if (data) {
      key = key.replace(p + '.', '');
      delete data[key];
    }
    return this;

  }

  /**
  *  Import an object as data
  *
  *  @since 1.0.0
  *  @version 1.1.0
  *  @author Liqueur de Toile <contact@liqueurdetoile.com>
  *
  *  @param {Object} data Object to import
  *  @param {dottedKey}  [pKey]  Parent key
  *  @returns {this} Chainable
  */
  import(data, pKey) {
    if (data instanceof ObjectArray) data = data._data;
    for (let key in data) this.push(key, data[key], pKey);
    return this;
  }

  /**
  *  Runs a callback on each entry at the `key` level
  *
  *  @since 1.0.0
  *  @version 2.0.0
  *  @author Liqueur de Toile <contact@liqueurdetoile.com>
  *
  *  @param {ForEachCallback} cb Callback to be run
  *  @param {dottedKey}  [key]  Dotted key to limit iterations through its subset
  *  if empty, the global data object will be used
  *  @param {dottedKey}  [pKey]  Parent key
  *  @param {boolean} [throwable=true] Wether to throw an exception if key doesn't exist
  *  @returns {void}
  *  @throws  {TypeError} If key does not exist
  */
  forEach(cb, key, pKey, throwable = true) {
    let data, index = 0;

    if (typeof key === 'undefined') data = this._data;
    else data = this.dataset(key, pKey, throwable);

    for (let k in data) cb.call(this, data[k], k, index++, this.parentKey(key));
  }

  /**
  *  Reduce the ObjectArray data given a callback
  *
  *  @since 1.0.0
  *  @version 2.0.0
  *  @author Liqueur de Toile <contact@liqueurdetoile.com>
  *
  *  @param   {ReducerCallback}  reducer   Callback to apply to each key/value (from left)
  *  @param   {Mixed}     [start]   Initial value for iteration
  *  @param   {dottedKey} [key]  Dotted key to limit iterations through its subset
  *  if empty, the global data object will be used
  *  @param {dottedKey}  [pKey]  Parent key
  *  @param {boolean} [throwable=true] Wether to throw an exception if key doesn't exist
  *  @returns {Mixed}     Callback iteration returned value
  *  @throws  {TypeError} If key does not exist
  */
  reduce(reducer, start, key, pKey, throwable = true) {
    var acc = start;

    if (typeof key !== 'undefined') {
      key = this._key(key, pKey, throwable);
      if (typeof key === 'undefined') return undefined;
    }

    this.forEach(function (value, k) {
      acc = reducer(acc, value, k, this.parentKey(key));
    }, key);
    return acc;
  }

  /**
  *  Returns a string suitable for a `style` attribute.
  *  ObjectArray will convert camel-cased key to dashed key.
  *
  *  @since 1.0.0
  *  @version 2.0.0
  *  @author Liqueur de Toile <contact@liqueurdetoile.com>
  *
  *  @param {dottedKey}  [key]  Dotted key to limit iterations through its subset
  *  if empty, the global data object will be used
  *  @param {dottedKey}  [pKey]  Parent key
  *  @param {boolean} [throwable=true] Wether to throw an exception if key doesn't exist
  *  @returns {String|undefined}  style string
  *  @throws  {TypeError} If key does not exist
  */
  stylesToString(key, pKey, throwable = true) {
    let ret = this.reduce(function (str, value, k) {
      str += this.dashize(k) + ':' + value + ';';
      return str;
    }.bind(this), '', key, pKey, throwable);

    return typeof ret !== 'undefined' ? ret.substr(0, ret.length - 1) : undefined;
  }

  /**
  *  Imports a string from a `style` attribute.
  *  ObjectArray will camelize key from spaces and/or dashes
  *
  *  @since 1.2.0
  *  @version 1.0.3
  *  @author Liqueur de Toile <contact@liqueurdetoile.com>
  *
  *  @param {String}  str   String to import
  *  @param {dottedKey}  [pKey]  Dotted key to import styles into.
  *  If omitted, the object will be available at top-level
  *  @returns {this} Chainable
  */
  stringToStyles(str, pKey) {
    let styles;

    if (typeof str === 'undefined' || str === null) return this; // fix null input value

    styles = str.split(';');
    styles.forEach(function (style) {
      let parts;

      if (style !== '') { // Fix trailing ;
        parts = style.split(':');
        try {
          this.push(this.camelize(parts[0].trim()), parts[1].trim(), pKey);
        } catch (e) {
          throw new TypeError('Malformed string for stringToStyles');
        }
      }
    }.bind(this));
    return this;
  }

  /**
  *  Returns a string suitable for a URI query string
  *
  *  @since 1.0.0
  *  @version 2.0.0
  *  @author Liqueur de Toile <contact@liqueurdetoile.com>
  *
  *  @param {dottedKey}  [key]  Dotted key to limit iterations through its subset
  *  if empty, the global data object will be used
  *  @param {dottedKey}  [pKey]  Parent key
  *  @param {boolean} [throwable=true] Wether to throw an exception if key doesn't exist
  *  @returns {String|undefined}  style string
  *  @throws  {TypeError} If key does not exist
  */
  urlEncode(key, pKey, throwable = true) {
    let ret = this.reduce(function (str, value, key) {
      str += key + '=' + encodeURIComponent(value) + '&';
      return str;
    }, '', key, pKey, throwable);

    return typeof ret !== 'undefined' ? ret.substr(0, ret.length - 1) : undefined;
  }

  /**
  *  Returns a string suitable for a `form-url-encoded` query string
  *
  *  @since 1.0.0
  *  @version 2.0.0
  *  @author Liqueur de Toile <contact@liqueurdetoile.com>
  *
  *  @param {dottedKey}  [key]  Dotted key to limit iterations through its subset
  *  if empty, the global data object will be used
  *  @param {dottedKey}  [pKey]  Parent key
  *  @param {boolean} [throwable=true] Wether to throw an exception if key doesn't exist
  *  @returns {String|undefined}  style string
  *  @throws  {TypeError} If key does not exist
  */
  formUrlEncode(key, pKey, throwable = true) {
    let ret = this.urlEncode(key, pKey, throwable);

    return typeof ret === 'undefined' ? undefined : ret.replace('%20', '+');
  }

  /**
  *  Returns a camelized string (without uppercase leading character)
  *  Replace dashes and spaces
  *
  *  @since 1.2.0
  *  @version 1.0.0
  *  @author Liqueur de Toile <contact@liqueurdetoile.com>
  *
  *  @param {String}  s  String to camelize
  *  @returns {String}  Camelized string
  */
  camelize(s) {
    return s.replace(/[- ]([A-Za-z])/g, m => m[1].toUpperCase());
  }

  /**
  *  Returns a dashed string
  *  Replace Uppercases and spaces
  *
  *  @since 1.2.0
  *  @version 1.0.0
  *  @author Liqueur de Toile <contact@liqueurdetoile.com>
  *
  *  @param {String}  [s]  String to dashize
  *  @returns {String}  Dashed string
  */
  dashize(s) {
    return s
      .replace(/[A-Z]/g, (m, o) => (o > 0 ? '-' : '') + m.toLowerCase())
      .replace(/ /g, (m, o, s) => s[o + 1] === '-' ? '' : '-');
  }
}

export default ObjectArray;
