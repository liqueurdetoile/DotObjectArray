[![Build Status](https://travis-ci.org/liqueurdetoile/DotObjectArray.svg?branch=master)](https://travis-ci.org/liqueurdetoile/DotObjectArray)
[![Coverage Status](https://coveralls.io/repos/github/liqueurdetoile/DotObjectArray/badge.svg?branch=master)](https://coveralls.io/github/liqueurdetoile/DotObjectArray?branch=master)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

<p align="center"><a href="https://liqueurdetoile.com" target=_blank"><img src="http://hosting.liqueurdetoile.com/logo_lqdt.png" alt="Liqueur de Toile"></a></p>

# DotObjectArray, a.k.a. DOA a.k.a. ObjectArray

- [Why DOA ?](#why-doa--)
- [Features](#features)
- [Install](#install)
  * [Module](#npm-module)
  * [Browser](#browser)
- [Usage](#usage)
  * [Api details](#api-details)
  * [Create an instance](#create-an-instance)
  * [Data managemement](#data-managemement)
    + [Raw data getter and setter](#raw-data-getter-and-setter)
    + [Fetch dataset](#fetch-dataset)
    + [Push data](#push-data)
    + [Import data](#import-data)
    + [Push and import in dataset](#push-and-import-in-dataset)
    + [Delete dataset](#delete-dataset)
  * [Utility methods](#utility-methods)
    + [Check key existence](#check-key-existence)
    + [get length of a dataset](#get-length-of-a-dataset)
    + [Get array of keys or array of values of a dataset](#get-array-of-keys-or-array-of-values-of-a-dataset)
  * [Iterations](#iterations)
    + [forEach](#foreach)
    + [reduce](#reduce)
  * [Serializers](#serializers)
    + [styleString](#stylestring)
    + [urlEncode](#urlencode)
    + [formUrlEncode](#formurlencode)
- [Want to help ?](#want-to-help--)

## Why DOA ?
For three reasons :
- No support for associative arrays in vanilla JS
- Creating deep levels keys in a vanilla JS <tt>Object</tt> can programmatically be a pain if none of parent keys exists
- Bored of always using the same snippets everywhere and wants to have a NPM dependency ready to import

## Features
DOA is an object with a set of methods to :
- Check, push, get and store data with ease regardless of its level
- Brings some array-like behaviours for convenience (you know <tt>forEach</tt>, eh ?)
- Easy to use data serializers and parsers

## Install
### Module
The ObjectArray class is provided as a UMD module available on NPM.
```
npm install dot-object-array
```
Then simply require/import it :
```javascript
import ObjectArray from 'dot-object-array';
const ObjectArray = require('dot-object-array').default;
```
ObjectArray have been built on a ECMA6 class with a default export. that's the reason why one must append `default` to the require call.

### Browser
For browser install, you can simply fetch `dist/objectarray.min.js` in this repo and load it :
```html
<script type="text/javascript" src="myJsFolder/objectarray.min.js"></script>
```
An ObjectArray constructor will be added to global (window) scope.

## Usage
### Api details
[A full documentation for Api is available](https://github.com/liqueurdetoile/DotObjectArray/blob/master/docs/api.md)

### Create an instance
You can create an instance by calling `new ObjectArray()` or initialize it with data at creation :

```javascript
// Vanilla object
var test = {
  test1: 'fixture',
  test2: {
    subtest1: 'subfixture1',
    subtest2: 'subfixture2'
  }
};

var doa = new ObjectArray(test);
```
### Data managemement
#### Raw data getter and setter
The whole data object will be accessible and mutable through the `data` property :
```javascript
var doa = new ObjectArray();
// Set the data
doa.data = {test: 'fixture'};
// Get the data
console.log(doa.data.test) //Output 'fixture'
```
You can only treat with the whole data object through this property. *Data is kept under a "private" `_data` property that can be accessed though I do not recommend it, especially for imports*

#### Fetch dataset
Specific dataset linked to a key can be retrieved with the `dataset` method and using dot notation :
```javascript
var doa = new ObjectArray({
  dat: {
    long: {
      path: 'fixture1',
      dream: 'fixture2'
    }
  }
});

// Get the dataset
console.log(doa.dataset('dat.long')) //Output {path: 'fixture1', dream: 'fixture2'}
```
Calling `doa.dataset()` will return the whole data object.

Using `doa.dataset('dat.stupid.path.to.things')` will return `undefined` because keys don't exist, while `doa.data.dat.stupid.path.to.things` will throw an error.

#### Push data
As an array, you can push data by calling the `push` method of the ObjectArray. You can use dotted key notation and ObjectArray will take care to create all needed keys.
```javascript
var doa = new ObjectArray();
doa.push('dat.really.long.path', 'fixture');
console.log(doa.data);
// will output {dat:{really:{long:{path:"fixture"}}}}
```

#### Import data
If you want to import multiple keys at once, you can do only one call to `import` :
```javascript
var doa = new ObjectArray();
doa.import({
  'dat.really.long.path', 'fixture1',
  'dat.really.long.dream', 'fixture2',
  'dat.shorter.path', 'fixture3'
);
console.log(doa.data);
// will output {dat:{really:{long:{path:"fixture1",dream:"fixture2"}},shorter:{path:"fixture3"}}}
```

#### Push and import in dataset
You can easily push or import in dataset with an extra parameter.
```javascript
var doa = new ObjectArray();
doa.push('dat.really.long.path', 'fixture1');
doa.push('dream', 'fixture2', 'dat.really.long');
doa.import({
  'shorter.path': 'fixture3'
}, 'dat');

console.log(doa.data);
// will output {dat:{really:{long:{path:"fixture1",dream:"fixture2"}},shorter:{path:"fixture3"}}}
```
#### Delete dataset
Simply call `delete` method while providing the key to delete
```javascript
var doa = new ObjectArray({
  dat: {
    long: {
      path: 'fixture1',
      dream: 'fixture2'
    }
  }
});

// Delete dat.long.path
doa.delete('dat.long.dream');

console.log(doa.dataset('dat.long')) //Output {path: 'fixture1'}
```
### Utility methods
#### Check key existence
Use the `has` method
```javascript
var doa = new ObjectArray({
  dat: {
    long: {
      path: 'fixture1',
      dream: 'fixture2'
    }
  }
});

doa.has('dat.long.path'); // returns true
doa.has('dat.short.path'); // returns false
```
#### get length of a dataset
Use the `length` method with the key of the dataset. Providing no key means to be the top-level of the data object.
```javascript
var doa = new ObjectArray({
  dat: {
    long: {
      path: 'fixture1',
      dream: 'fixture2'
    }
  }
});

doa.length(); // returns 1 (one key in the dataset : dat
doa.length('data.long'); // returns 2 (two keys in the dataset : path and dream
```
The method will return `undefined` if the key doesn't exist.

#### Get array of keys or array of values of a dataset
Use the `keys` or `values` method with the key of the dataset. Providing no key means to be the top-level of the data object.
```javascript
var doa = new ObjectArray({
  dat: {
    long: {
      path: 'fixture1',
      dream: 'fixture2'
    }
  }
});

doa.keys(); // returns ['dat']
doa.values(); // returns [{long:{path:'fixture1', dream:'fixture2'}}], not very useful in this case
doa.keys('dat.long'); // returns ['path','dream']
doa.values('dat.long'); // returns ['fixture1','fixture2']
```
The methods will return `undefined` if the key doesn't exist.

### Iterations
#### forEach
The `forEach` method works exactly the same way than in the vanilla `array` object. The callback can take as much as three arguments quite self-explanatory. A forEach call can be done only on a dataset with a second parameter.
```javascript
var doa = new ObjectArray({
  dat: {
    long: {
      path: 'fixture1',
      dream: 'fixture2'
    }
  }
});

doa.forEach(function(value, key, index) {
  console.log(key);
}); // will output dat

doa.forEach(function(value, key, index) {
  console.log(value);
}, 'dat.long'); // will output 'fixture1', 'fixture2'
```
#### [reduce](https://github.com/liqueurdetoile/DotObjectArray/blob/master/docs/api.md#ObjectArray..reduce)
The `reduce` method works exactly the same way than in the [vanilla `array` object](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/reduce) except that the key is provided to the callback function as a third parameter.

As forEach, reduce can be easily run on a subset instead at top-level with providing the key of the subset as second parameter. [See API for details](https://github.com/liqueurdetoile/DotObjectArray/blob/master/docs/api.md)

### Serializers
Embedded Serializers are provided for common cases. Each can be run on a dataset with providing the dotted key of the dataset as parameter.
#### [styleString](https://github.com/liqueurdetoile/DotObjectArray/blob/master/docs/api.md#ObjectArray..styleString)
styleString will convert the dataset to a string suitable to a `style` attribute
```javascript
let doa = new ObjectArray({
  position: 'absolute',
  display: 'flex'
});

doa.styleString(): // returns 'position:absolute;display:flex'
```
#### [urlEncode](https://github.com/liqueurdetoile/DotObjectArray/blob/master/docs/api.md#ObjectArray..urlEncode)
urlEncode will convert the dataset to a string suitable to a query part of an URI
```javascript
let doa = new ObjectArray({
  input: 'test',
  glob: '**/*',
  alias: 'test fixture'
});

doa.urlEncode(): // returns 'input=test&glob=**%2F*&alias=test%20fixture'
```
#### [formUrlEncode](https://github.com/liqueurdetoile/DotObjectArray/blob/master/docs/api.md#ObjectArray..formUrlEncode)
formUrlEncode will convert the dataset to a string suitable for sending as a `form-url-encoded` data
```javascript
let doa = new ObjectArray({
  input: 'test',
  glob: '**/*',
  alias: 'test fixture'
});

doa.urlEncode(): // returns 'input=test&glob=**%2F*&alias=test+fixture'
```
## Want to help ?
There is many more to do to implements othe features. Don't mind fork DOA, tweak it and submit a pull request :wink:
