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

export default class ObjectArray {
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
  *  Returns a joined dotted key from key and parent key
  *
  *  @since 2.0.0
  *  @version 1.0.0
  *  @author Liqueur de Toile <contact@liqueurdetoile.com>
  *
  *  @param {dottedKey}   key     Key
  *  @param {dottedKey}   [pKey]  Parent key
  *  @returns {Boolean}  true if key exists, false otherwise
  *  @throws  {TypeError} If key does not exist
  */
  _key(key, pKey) {
    if (pKey) key = pKey + '.' + key;
    if (this.has(key) || typeof key === 'undefined') return key;
    throw new TypeError('Inexistent key, key : ' + key + ', Parent key : ' + pKey);
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
  *  an alias for [remove method]{@link ObjectArray~remove}
  *
  *  @since 1.2.0
  *  @version 2.0.0
  *  @author Liqueur de Toile <contact@liqueurdetoile.com>
  *
  *  @param {dottedKey} key  Key to remove
  *  @param {dottedKey}  [pKey] Parent key
  *  @returns {this} Chainable
  *  @throws  {TypeError} If key does not exist
  */
  empty(key, pKey) {
    key = this._key(key, pKey);
    if (!key) this._data = {};
    else this.remove(key);
    return this;
  }

  /**
  *  Returns length of a given dataset in the ObjectArray
  *  If no key is provided, it will output the length of
  *  the root data object
  *
  *  @since 1.0.0
  *  @version 2.0.0
  *  @author Liqueur de Toile <contact@liqueurdetoile.com>
  *
  *  @param {dottedKey} key  Key
  *  @param {dottedKey}  [pKey] Parent key
  *  @returns  {Number|undefined} Length of the dataset
  *  @throws  {TypeError} If key does not exist
  */
  length(key, pKey) {
    return this.keys(this._key(key, pKey)).length;
  }

  /**
  *  Returns keys of a given dataset in the ObjectArray
  *  If no key is provided, it will output the keys of
  *  the root data object
  *
  *  @since 1.0.0
  *  @version 2.0.0
  *  @author Liqueur de Toile <contact@liqueurdetoile.com>
  *
  *  @param {dottedKey} key  Key
  *  @param {dottedKey}  [pKey] Parent key
  *  @returns  {Array|undefined} Array of keys for the dataset
  *  @throws  {TypeError} If key does not exist
  */
  keys(key, pKey) {
    let keys = [], data = this.dataset(this._key(key, pKey));

    for (let k in data) keys.push(k);
    return keys;
  }

  /**
  *  Returns values of a given dataset in the ObjectArray
  *  If no key is provided, it will output the values of
  *  the root data object
  *
  *  @since 1.0.0
  *  @version 2.0.0
  *  @author Liqueur de Toile <contact@liqueurdetoile.com>
  *
  *  @param {dottedKey} key  Key
  *  @param {dottedKey}  [pKey] Parent key
  *  @returns  {Array|undefined} Array of values for the dataset
  *  @throws  {TypeError} If key does not exist
  */
  values(key, pKey) {
    let values = [], data = this.dataset(this._key(key, pKey));

    for (let k in data) values.push(data[k]);
    return values;
  }

  /**
  *  Check if a given key exists in the ObjectArray
  *
  *  @since 1.0.0
  *  @version 1.1.0
  *  @author Liqueur de Toile <contact@liqueurdetoile.com>
  *
  *  @param {dottedKey}  key Key
  *  @param {dottedKey}  [pKey] Parent key
  *  @returns {Boolean}  true if key exists, false otherwise
  */
  has(key, pKey) {
    let i, k, data = this._data;

    if (typeof key === 'undefined') return false;
    if (typeof pKey !== 'undefined') key = pKey + '.' + key;

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
    if (this.has(key, pKey)) {
      let v = this.pull(key, pKey);

      if (strict) return val === v;
      else return val == v; //eslint-disable-line
    }
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
  *  @returns {Object|undefined} Data object
  *  @throws  {TypeError} If key does not exist
  */
  dataset(key, pKey) {
    let i, k, data = this.data;

    key = this._key(key, pKey);

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
  *  Alias for {@link dataset} method.
  *  Returns dataset for the key.
  *  If no key is provided, the whole data is returned
  *
  *  @since 1.4.0
  *  @version 1.0.0
  *  @author Liqueur de Toile <contact@liqueurdetoile.com>
  *
  *  @param {dottedKey}  [key] Key
  *  @param {dottedKey}  [pKey] Parent Key
  *  @returns {Object|undefined} Data object
  *  @throws  {TypeError} If key does not exist
  */
  pull(key, pKey) {
    return this.dataset(key, pKey);
  }

  /**
  *  Returns the parent key for a given key
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
  *  Returns the child key for a given key
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
  *  Remove key/value data
  *
  *  @since 1.1.0
  *  @version 2.0.0
  *  @author Liqueur de Toile <contact@liqueurdetoile.com>
  *
  *  @param {dottedKey} key Key of the added item
  *  @param {dottedKey}  [pKey]  Parent key
  *  @returns {this} Chainable
  *  @throws  {TypeError} If key does not exist
  */
  remove(key, pKey) {
    let p, data;
    
    key = this._key(key, pKey);
    p = this.parentKey(key);
    data = this.dataset(p);

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
  *  @returns {void}
  *  @throws  {TypeError} If key does not exist
  */
  forEach(cb, key, pKey) {
    let data, index = 0;
    
    key = this._key(key, pKey);
    data = this.dataset(key);    

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
  *  @returns {Mixed}     Callback iteration returned value
  *  @throws  {TypeError} If key does not exist
  */
  reduce(reducer, start, key, pKey) {
    var acc = start;

    key = this._key(key, pKey);
    this.forEach(function (value, k) { acc = reducer(acc, value, k, this.parentKey(key)); }, key);
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
  *  @returns {String}  style string
  *  @throws  {TypeError} If key does not exist
  */
  stylesToString(key, pKey) {
    let ret = this.reduce(function (str, value, k) {
      str += this.dashize(k) + ':' + value + ';';
      return str;
    }.bind(this), '', key, pKey);

    return ret.substr(0, ret.length - 1);
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
  *  @returns {String}  style string
  *  @throws  {TypeError} If key does not exist
  */
  urlEncode(key, pKey) {
    let ret = this.reduce(function (str, value, key) {
      str += key + '=' + encodeURIComponent(value) + '&';
      return str;
    }, '', key, pKey);

    return ret.substr(0, ret.length - 1);
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
  *  @returns {String}  style string
  *  @throws  {TypeError} If key does not exist
  */
  formUrlEncode(key, pKey) {
    let ret = this.urlEncode(key, pKey);

    return ret.replace('%20', '+');
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

if (window) window.ObjectArray = ObjectArray;

