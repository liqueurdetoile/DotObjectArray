[![GitHub release](https://img.shields.io/github/release/liqueurdetoile/objectarray.svg)](https://www.npmjs.com/package/dot-object-array)
[![Build Status](https://travis-ci.org/liqueurdetoile/DotObjectArray.svg?branch=master)](https://travis-ci.org/liqueurdetoile/DotObjectArray)
[![Coverage Status](https://coveralls.io/repos/github/liqueurdetoile/DotObjectArray/badge.svg?branch=master)](https://coveralls.io/github/liqueurdetoile/DotObjectArray?branch=master)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Documentation](badge.svg)](https://liqueurdetoile.github.io/DotObjectArray/)

[![bitHound Overall Score](https://www.bithound.io/github/liqueurdetoile/DotObjectArray/badges/score.svg)](https://www.bithound.io/github/liqueurdetoile/DotObjectArray)
[![bitHound Code](https://www.bithound.io/github/liqueurdetoile/DotObjectArray/badges/code.svg)](https://www.bithound.io/github/liqueurdetoile/DotObjectArray)
[![bitHound Dependencies](https://www.bithound.io/github/liqueurdetoile/DotObjectArray/badges/dependencies.svg)](https://www.bithound.io/github/liqueurdetoile/DotObjectArray/master/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/liqueurdetoile/DotObjectArray/badges/devDependencies.svg)](https://www.bithound.io/github/liqueurdetoile/DotObjectArray/master/dependencies/npm)
[![Known Vulnerabilities](https://snyk.io/test/github/liqueurdetoile/dotobjectarray/badge.svg?targetFile=package.json)](https://snyk.io/test/github/liqueurdetoile/dotobjectarray?targetFile=package.json)

<p align="center"><a href="https://liqueurdetoile.com" target="\_blank"><img src="https://hosting.liqueurdetoile.com/logo_lqdt.png" alt="Liqueur de Toile"></a></p>

# DotObjectArray, a.k.a. DOA a.k.a. ObjectArray

## Why DOA ?
For three reasons :
- No support for associative arrays in vanilla JS
- Creating deep levels keys in a vanilla JS <tt>Object</tt> can programmatically be a pain if none of parent keys exists
- Bored of always using the same snippets everywhere and wants to have a less then 10KB NPM dependency ready to import

## Features
DOA is an object with a set of methods to :
- Check, push, get and store data with ease regardless of its level
- Brings some array-like behaviours for convenience (you know <tt>forEach</tt>, eh ?)
- Easy to use data serializers and parsers
- Work as well on a whole dataset or a key-based sub-selection of the dataset

## Installation
### Module
The ObjectArray class is provided as a UMD module available on NPM.
```
npm install dot-object-array
```
Then simply require/import it :
```javascript
import ObjectArray from 'dot-object-array';
const ObjectArray = require('dot-object-array').default;
// or
const ObjectArray = require('dot-object-array').ObjectArray;
```
ObjectArray have been built on a ECMA6 class with webpack a named default export.

### Browser
For browser install, you can simply fetch `dist/objectarray.min.js` in this repo and load it :
```html
<script type="text/javascript" src="myJsFolder/objectarray.min.js"></script>
```
An ObjectArray constructor will be added to global (window) scope.

## Quick examples
```javascript
// Import data at creation
var doa = new ObjectArray({
	item1: 3,
 item2: 12,
 item3: 5
});

//Add data
doa.push('item4', 4); // Single item or dataset
doa.import({
  item5: 5,
  item6: 6
});

//Add data with dotted notations
doa.push('dat.long.darn.key','isntIt?'); // Will automatically create each keys

//Iterate on keys at root level or in sub dataset
doa.forEach(function(value, key, index) {
 [...]
});
doa.forEach(function(value, key, index) {
 [...]
}, 'dat.path.to.data');

// Sub dataset import
doa.import({
 subitem1: 1,
 subitem2: 'astring',
 subitem3: {obj: really}
}, 'dat.long.and.far.away.key');

//sub dataset access
doa.dataset('dat.long.and.far.away.key');
// or
doa.pull('dat.long.and.far.away.key');

// And many more !
```
## Playground
If you want to go further and try a bit, you [can go to the playground](https://jsfiddle.net/dx03k9sL/19/).

## Documentation
A full documentation (manual and API reference) set is available : [https://liqueurdetoile.github.io/DotObjectArray](https://liqueurdetoile.github.io/DotObjectArray)

## JSON support
You can easily use ObjectArrays to manipulate JSON data. Just rely on JSON native object to import your JSON structure, manipulate it with ObjectArray ease and get it back at the end :wink:
```javascript
var jstring = '{"dat": {"long": {"path": "foo", "dream": "baz"}}}';
var doa = new ObjectArray(JSON.parse(jstring));

// Let's say we want to move all dat.long stuff to a short thing
doa.push('short', doa.dataset('dat.long')).remove('dat');
      
console.log(JSON.stringify(doa.data)); // outputs {"short":{"path":"foo","dream":"baz"}}
```
## Bugs and features requests
ObjectArray is test-driven though it did not prevent all issues. Please report here any trouble or features request.

## Want to help ?
There is many more to do to implements othe features. Don't mind fork DOA, tweak it and submit a pull request :wink: