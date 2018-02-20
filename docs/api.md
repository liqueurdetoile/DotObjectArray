## Classes

<dl>
<dt><a href="#ObjectArray">ObjectArray</a></dt>
<dd><p>The ObjectArray class implements array-like properties and
 methods to a key/value javascript object.
 It can be viewed as a kind of associative array in JS but it also
 supports dot notation keys.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#dottedKey">dottedKey</a> : <code>String</code></dt>
<dd><p>A dotted key is useful to quickly access a subset of data
 stored into the ObjectArray as if it was still a
 vanilla <tt>Object</tt>.</p>
</dd>
</dl>

<a name="ObjectArray"></a>

## ObjectArray
The ObjectArray class implements array-like properties and
 methods to a key/value javascript object.
 It can be viewed as a kind of associative array in JS but it also
 supports dot notation keys.

**Kind**: global class  
**See**

- [Github](https://github.com/liqueurdetoile/objectarray)
- [Author website](https://liqueurdetoile.com)

**Since**: 1.0.0  
**Version**: 1.0.0  
**Author**: Liqueur de Toile <contact@liqueurdetoile.com>  
**License**: MIT [https://choosealicense.com/licenses/mit/](https://choosealicense.com/licenses/mit/)  

* [ObjectArray](#ObjectArray)
    * [new ObjectArray(data)](#new_ObjectArray_new)
    * [~data](#ObjectArray..data) : <code>Object</code>
    * [~clone([keepFlattened])](#ObjectArray..clone) ⇒ [<code>ObjectArray</code>](#ObjectArray)
    * [~empty(Key)](#ObjectArray..empty) ⇒ [<code>ObjectArray</code>](#ObjectArray)
    * [~length(pKey)](#ObjectArray..length) ⇒ <code>Number</code> \| <code>undefined</code>
    * [~keys(pKey)](#ObjectArray..keys) ⇒ <code>Array</code> \| <code>undefined</code>
    * [~values(pKey)](#ObjectArray..values) ⇒ <code>Array</code> \| <code>undefined</code>
    * [~has(key)](#ObjectArray..has) ⇒ <code>Boolean</code>
    * [~dataset([key])](#ObjectArray..dataset) ⇒ <code>Object</code> \| <code>undefined</code>
    * [~parentKey(key)](#ObjectArray..parentKey) ⇒ <code>String</code>
    * [~childKey(key)](#ObjectArray..childKey) ⇒ <code>String</code>
    * [~flatten([dotted], [pKey])](#ObjectArray..flatten) ⇒ <code>Boolean</code>
    * [~push(key, val, [pKey])](#ObjectArray..push) ⇒ [<code>ObjectArray</code>](#ObjectArray)
    * [~remove(key)](#ObjectArray..remove) ⇒ [<code>ObjectArray</code>](#ObjectArray)
    * [~import(Data, [pKey])](#ObjectArray..import) ⇒ [<code>ObjectArray</code>](#ObjectArray)
    * [~forEach(cb, [key])](#ObjectArray..forEach) ⇒ <code>void</code>
    * [~reduce(reducer, [start], [key])](#ObjectArray..reduce) ⇒ <code>Mixed</code>
    * [~stylesToString([key])](#ObjectArray..stylesToString) ⇒ <code>String</code>
    * [~stringToStyles(str, [pkey])](#ObjectArray..stringToStyles) ⇒ [<code>ObjectArray</code>](#ObjectArray)
    * [~urlEncode([key])](#ObjectArray..urlEncode) ⇒ <code>String</code>
    * [~formUrlEncode([key])](#ObjectArray..formUrlEncode) ⇒ <code>String</code>
    * [~camelize(s)](#ObjectArray..camelize) ⇒ <code>String</code>
    * [~dashize([s])](#ObjectArray..dashize) ⇒ <code>String</code>

<a name="new_ObjectArray_new"></a>

### new ObjectArray(data)
The constructor is straight-forward. It can be provided with an existent object

**Returns**: [<code>ObjectArray</code>](#ObjectArray) - ObjectArray object  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | Initial data to push into the ObjectArray |

<a name="ObjectArray..data"></a>

### ObjectArray~data : <code>Object</code>
Getter/setter for the root data of ObjectArray.

**Kind**: inner property of [<code>ObjectArray</code>](#ObjectArray)  
**Since**: 1.0.0  
**Version**: 1.0.0  
**Author**: Liqueur de Toile <contact@liqueurdetoile.com>  
<a name="ObjectArray..clone"></a>

### ObjectArray~clone([keepFlattened]) ⇒ [<code>ObjectArray</code>](#ObjectArray)
Returns a clone with same data of the current ObjectArray

**Kind**: inner method of [<code>ObjectArray</code>](#ObjectArray)  
**Returns**: [<code>ObjectArray</code>](#ObjectArray) - Return cloned ObjectArray  
**Since**: 1.3.0  
**Version**: 1.0.0  
**Author**: Liqueur de Toile <contact@liqueurdetoile.com>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [keepFlattened] | <code>Boolean</code> | <code>true</code> | If true, the flattened dotted keys will remains flattened  otherwise, the full hierarchy will be restored |

<a name="ObjectArray..empty"></a>

### ObjectArray~empty(Key) ⇒ [<code>ObjectArray</code>](#ObjectArray)
Empty the ObjectArray data. It can also be used as
 an alias for [remove method](#ObjectArray..remove)

**Kind**: inner method of [<code>ObjectArray</code>](#ObjectArray)  
**Returns**: [<code>ObjectArray</code>](#ObjectArray) - Return self for chaining  
**Since**: 1.2.0  
**Version**: 1.0.0  
**Author**: Liqueur de Toile <contact@liqueurdetoile.com>  

| Param | Type | Description |
| --- | --- | --- |
| Key | [<code>dottedKey</code>](#dottedKey) | Key to remove |

<a name="ObjectArray..length"></a>

### ObjectArray~length(pKey) ⇒ <code>Number</code> \| <code>undefined</code>
Returns length of a given dataset in the ObjectArray
 If no parent key is provided, it will output the length of
 the root data object

**Kind**: inner method of [<code>ObjectArray</code>](#ObjectArray)  
**Returns**: <code>Number</code> \| <code>undefined</code> - Length of the dataset or undefined if key doesn't exist  
**Since**: 1.0.0  
**Version**: 1.0.0  
**Author**: Liqueur de Toile <contact@liqueurdetoile.com>  

| Param | Type | Description |
| --- | --- | --- |
| pKey | [<code>dottedKey</code>](#dottedKey) | Parent key |

<a name="ObjectArray..keys"></a>

### ObjectArray~keys(pKey) ⇒ <code>Array</code> \| <code>undefined</code>
Returns keys of a given dataset in the ObjectArray
 If no parent key is provided, it will output the keys of
 the root data object

**Kind**: inner method of [<code>ObjectArray</code>](#ObjectArray)  
**Returns**: <code>Array</code> \| <code>undefined</code> - Array of keys for the dataset
 or undefined if key doesn't exist  
**Since**: 1.0.0  
**Version**: 1.0.0  
**Author**: Liqueur de Toile <contact@liqueurdetoile.com>  

| Param | Type | Description |
| --- | --- | --- |
| pKey | [<code>dottedKey</code>](#dottedKey) | Parent key |

<a name="ObjectArray..values"></a>

### ObjectArray~values(pKey) ⇒ <code>Array</code> \| <code>undefined</code>
Returns values of a given dataset in the ObjectArray
 If no parent key is provided, it will output the keys of
 the root data object

**Kind**: inner method of [<code>ObjectArray</code>](#ObjectArray)  
**Returns**: <code>Array</code> \| <code>undefined</code> - Array of values for the dataset
 or undefined if key doesn't exist  
**Since**: 1.0.0  
**Version**: 1.0.0  
**Author**: Liqueur de Toile <contact@liqueurdetoile.com>  

| Param | Type | Description |
| --- | --- | --- |
| pKey | [<code>dottedKey</code>](#dottedKey) | Parent key |

<a name="ObjectArray..has"></a>

### ObjectArray~has(key) ⇒ <code>Boolean</code>
Check if a given key exists in the ObjectArray

**Kind**: inner method of [<code>ObjectArray</code>](#ObjectArray)  
**Returns**: <code>Boolean</code> - true if key exists, false otherwise  
**Since**: 1.0.0  
**Version**: 1.0.0  
**Author**: Liqueur de Toile <contact@liqueurdetoile.com>  

| Param | Type | Description |
| --- | --- | --- |
| key | [<code>dottedKey</code>](#dottedKey) | Key |

<a name="ObjectArray..dataset"></a>

### ObjectArray~dataset([key]) ⇒ <code>Object</code> \| <code>undefined</code>
Returns dataset for the key. If no key is provided,
 the whole data is returned

**Kind**: inner method of [<code>ObjectArray</code>](#ObjectArray)  
**Returns**: <code>Object</code> \| <code>undefined</code> - Data object or undefined if key doesn't exist  
**Since**: 1.0.0  
**Version**: 1.0.0  
**Author**: Liqueur de Toile <contact@liqueurdetoile.com>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [key] | [<code>dottedKey</code>](#dottedKey) | <code></code> | Key |

<a name="ObjectArray..parentKey"></a>

### ObjectArray~parentKey(key) ⇒ <code>String</code>
Returns the parent key for a given key

**Kind**: inner method of [<code>ObjectArray</code>](#ObjectArray)  
**Returns**: <code>String</code> - Parent key  
**Since**: 1.0.0  
**Version**: 1.0.1  
**Author**: Liqueur de Toile <contact@liqueurdetoile.com>  

| Param | Type | Description |
| --- | --- | --- |
| key | [<code>dottedKey</code>](#dottedKey) | Key |

<a name="ObjectArray..childKey"></a>

### ObjectArray~childKey(key) ⇒ <code>String</code>
Returns the child key for a given key

**Kind**: inner method of [<code>ObjectArray</code>](#ObjectArray)  
**Returns**: <code>String</code> - Child key  
**Since**: 1.3.0  
**Version**: 1.0.0  
**Author**: Liqueur de Toile <contact@liqueurdetoile.com>  

| Param | Type | Description |
| --- | --- | --- |
| key | [<code>dottedKey</code>](#dottedKey) | Key |

<a name="ObjectArray..flatten"></a>

### ObjectArray~flatten([dotted], [pKey]) ⇒ <code>Boolean</code>
Flattens the object and replace data.

 Each object in the dataset is
 recursively explored to extract data and bring it a top level.

 With default behaviour, if two or more properties have same name under
 subkeys, the last explored one will replace the previous one.

 If the method is called with <tt>true</tt> as first parameter, the
 resulting data keys will be dotted, preventing duplication. In that case,
 you must access new keys with <tt>dataset</tt> method or by calling
 the <tt>data</tt> key property with [] (e.g. doa.data['my.key']);

 Flatten can be run only on a subdataset by providing a key as second parameter.

**Kind**: inner method of [<code>ObjectArray</code>](#ObjectArray)  
**Returns**: <code>Boolean</code> - Parent key  
**Since**: 1.3.0  
**Version**: 1.0.0  
**Author**: Liqueur de Toile <contact@liqueurdetoile.com>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [dotted] | <code>Boolean</code> | <code>false</code> |  |
| [pKey] | [<code>dottedKey</code>](#dottedKey) |  | Key to flatten. If not provided, the whole  dataset will flattened. |

<a name="ObjectArray..push"></a>

### ObjectArray~push(key, val, [pKey]) ⇒ [<code>ObjectArray</code>](#ObjectArray)
Push a new key/value pair

**Kind**: inner method of [<code>ObjectArray</code>](#ObjectArray)  
**Returns**: [<code>ObjectArray</code>](#ObjectArray) - Return self for chaining  
**Since**: 1.0.0  
**Version**: 1.1.0  
**Author**: Liqueur de Toile <contact@liqueurdetoile.com>  

| Param | Type | Description |
| --- | --- | --- |
| key | [<code>dottedKey</code>](#dottedKey) | Key of the added item |
| val | <code>Number</code> \| <code>String</code> \| <code>Array</code> \| <code>Object</code> | Value of the added item |
| [pKey] | [<code>dottedKey</code>](#dottedKey) | Parent key to push into |

<a name="ObjectArray..remove"></a>

### ObjectArray~remove(key) ⇒ [<code>ObjectArray</code>](#ObjectArray)
Remove key/value pair

**Kind**: inner method of [<code>ObjectArray</code>](#ObjectArray)  
**Returns**: [<code>ObjectArray</code>](#ObjectArray) - Return self for chaining  
**Since**: 1.0.0  
**Version**: 1.0.0  
**Author**: Liqueur de Toile <contact@liqueurdetoile.com>  

| Param | Type | Description |
| --- | --- | --- |
| key | [<code>dottedKey</code>](#dottedKey) | Key of the added item |

<a name="ObjectArray..import"></a>

### ObjectArray~import(Data, [pKey]) ⇒ [<code>ObjectArray</code>](#ObjectArray)
Import an object as data into the ObjectArray

**Kind**: inner method of [<code>ObjectArray</code>](#ObjectArray)  
**Returns**: [<code>ObjectArray</code>](#ObjectArray) - Return self for chaining  
**Since**: 1.0.0  
**Version**: 1.1.0  
**Author**: Liqueur de Toile <contact@liqueurdetoile.com>  

| Param | Type | Description |
| --- | --- | --- |
| Data | <code>Object</code> | Object to import |
| [pKey] | [<code>dottedKey</code>](#dottedKey) | Dotted parent key to import into |

<a name="ObjectArray..forEach"></a>

### ObjectArray~forEach(cb, [key]) ⇒ <code>void</code>
Runs a callback on each ObjectArray entry

**Kind**: inner method of [<code>ObjectArray</code>](#ObjectArray)  
**Since**: 1.0.0  
**Version**: 1.0.0  
**Author**: Liqueur de Toile <contact@liqueurdetoile.com>  

| Param | Type | Description |
| --- | --- | --- |
| cb | <code>forEachCallback</code> | Callback to be run |
| [key] | [<code>dottedKey</code>](#dottedKey) | Dotted key to limit iterations through its subset  if empty, the global data object will be used |

<a name="ObjectArray..reduce"></a>

### ObjectArray~reduce(reducer, [start], [key]) ⇒ <code>Mixed</code>
Reduce the ObjectArray data given a callback

**Kind**: inner method of [<code>ObjectArray</code>](#ObjectArray)  
**Returns**: <code>Mixed</code> - Callback returns value  
**Since**: 1.0.0  
**Version**: 1.0.0  
**Author**: Liqueur de Toile <contact@liqueurdetoile.com>  

| Param | Type | Description |
| --- | --- | --- |
| reducer | <code>Callback</code> | Callback to apply to each key/value (from left) |
| [start] | <code>Mixed</code> | Initial value for iteration |
| [key] | [<code>dottedKey</code>](#dottedKey) | Dotted key to limit iterations through its subset  if empty, the global data object will be used |

<a name="ObjectArray..stylesToString"></a>

### ObjectArray~stylesToString([key]) ⇒ <code>String</code>
Returns a string suitable for a <tt>style</tt> attribute.
 ObjectArray will convert camel-cased key to dashed key.

**Kind**: inner method of [<code>ObjectArray</code>](#ObjectArray)  
**Returns**: <code>String</code> - style string  
**Since**: 1.0.0  
**Version**: 1.1.0  
**Author**: Liqueur de Toile <contact@liqueurdetoile.com>  

| Param | Type | Description |
| --- | --- | --- |
| [key] | [<code>dottedKey</code>](#dottedKey) | Dotted key to limit iterations through its subset  if empty, the global data object will be used |

<a name="ObjectArray..stringToStyles"></a>

### ObjectArray~stringToStyles(str, [pkey]) ⇒ [<code>ObjectArray</code>](#ObjectArray)
Imports a string from a <tt>style</tt> attribute.
 ObjectArray will camelize key from spaces and/or dashes

**Kind**: inner method of [<code>ObjectArray</code>](#ObjectArray)  
**Returns**: [<code>ObjectArray</code>](#ObjectArray) - Returns self for chaining  
**Since**: 1.2.0  
**Version**: 1.0.2  
**Author**: Liqueur de Toile <contact@liqueurdetoile.com>  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> | String to import |
| [pkey] | [<code>dottedKey</code>](#dottedKey) | Dotted key to import styles into.  If omitted, the object will be available at top-level |

<a name="ObjectArray..urlEncode"></a>

### ObjectArray~urlEncode([key]) ⇒ <code>String</code>
Returns a string suitable for a URI query string

**Kind**: inner method of [<code>ObjectArray</code>](#ObjectArray)  
**Returns**: <code>String</code> - style string  
**Since**: 1.0.0  
**Version**: 1.0.0  
**Author**: Liqueur de Toile <contact@liqueurdetoile.com>  

| Param | Type | Description |
| --- | --- | --- |
| [key] | [<code>dottedKey</code>](#dottedKey) | Dotted key to limit iterations through its subset  if empty, the global data object will be used |

<a name="ObjectArray..formUrlEncode"></a>

### ObjectArray~formUrlEncode([key]) ⇒ <code>String</code>
Returns a string suitable for a <tt>form-url-encoded</tt> query string

**Kind**: inner method of [<code>ObjectArray</code>](#ObjectArray)  
**Returns**: <code>String</code> - style string  
**Since**: 1.0.0  
**Version**: 1.0.0  
**Author**: Liqueur de Toile <contact@liqueurdetoile.com>  

| Param | Type | Description |
| --- | --- | --- |
| [key] | [<code>dottedKey</code>](#dottedKey) | Dotted key to limit iterations through its subset  if empty, the global data object will be used |

<a name="ObjectArray..camelize"></a>

### ObjectArray~camelize(s) ⇒ <code>String</code>
Returns a camelized string (without uppercase leading character)
 Replace dashes and spaces

**Kind**: inner method of [<code>ObjectArray</code>](#ObjectArray)  
**Returns**: <code>String</code> - Camelized string  
**Since**: 1.2.0  
**Version**: 1.0.0  
**Author**: Liqueur de Toile <contact@liqueurdetoile.com>  

| Param | Type | Description |
| --- | --- | --- |
| s | <code>String</code> | String to camelize |

<a name="ObjectArray..dashize"></a>

### ObjectArray~dashize([s]) ⇒ <code>String</code>
Returns a dashed string
 Replace Uppercases and spaces

**Kind**: inner method of [<code>ObjectArray</code>](#ObjectArray)  
**Returns**: <code>String</code> - Dashed string  
**Since**: 1.2.0  
**Version**: 1.0.0  
**Author**: Liqueur de Toile <contact@liqueurdetoile.com>  

| Param | Type | Description |
| --- | --- | --- |
| [s] | <code>String</code> | String to dashize |

<a name="dottedKey"></a>

## dottedKey : <code>String</code>
A dotted key is useful to quickly access a subset of data
 stored into the ObjectArray as if it was still a
 vanilla <tt>Object</tt>.

**Kind**: global typedef  
**Example**  
```js
// Create an ObjectArray with subdata
 var oa = new ObjectArray({
   set1: {
     subset1: 'foo',
     subset2: {
       subsub1: 'bar',
       subsub2: 'baz'
     }
   }
 });
 // 'set1.subset1' will yield to 'foo'
 // 'set1.subset1.subsub2' will yield to 'baz'
```
