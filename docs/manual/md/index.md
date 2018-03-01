## Installation
### Module
The ObjectArray class is provided as a UMD module.
```
npm install dot-object-array
```
or
```
yarn add dot-object-array
```
Then simply require/import it :
```javascript
import ObjectArray from 'dot-object-array';
const ObjectArray = require('dot-object-array').default;
```
ObjectArray have been built on a ECMA6 class with webpack a named default export.

### Browser
DOA is available as CDN external link or can easily be installed locally.
#### Bundle
```html
<script type="text/javascript" src="https://bundle.run/dot-object-array@latest"></script>
```
#### JsDelivr
```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/dot-object-array@latest"></script>
```
#### Unpkg
```html
<script type="text/javascript" src="https://unpkg.com/dot-object-array@latest"></script>
```
#### Local install
For browser install, you can simply fetch file `dist/objectarray.min.js` in this repo or clone it and load it :
```html
<script type="text/javascript" src="myJsFolder/objectarray.min.js"></script>
```
An ObjectArray constructor will be added to global (window) scope.

## Create an instance
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
## Data managemement
### Raw data getter and setter
The whole data object will be accessible and mutable through the `data` property :
```javascript
var doa = new ObjectArray();
// Set the data
doa.data = {test: 'fixture'};
// Get the data
console.log(doa.data.test) //Output 'fixture'
```
You can only treat with the whole data object through this property. *Data is kept under a "private" `_data` property that can be accessed though I do not recommend it, especially for imports*

### Fetch dataset
Specific dataset linked to a key can be retrieved with the `dataset` method (or its alias `pull` method) and using dot notation :
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
// or
console.log(doa.pull('dat.long')) //Output {path: 'fixture1', dream: 'fixture2'}
```
Calling `doa.dataset()` will return the whole data object.

Using `doa.dataset('dat.stupid.path.to.things')` will throw a TypeError because keys don't exist.

### TypeError exception when key does not exist
By default, all data queries methods with parameters (keys, values, dataset, ...) will throw a TypeError if key does not exist.
With `pull` and `getset`, you can set the throwable parameter to `false` to disable throwing exception and return `undefined` instead.

### Push data
As an array, you can push data by calling the `push` method of the ObjectArray. You can use dotted key notation and ObjectArray will take care to create all needed keys.
```javascript
var doa = new ObjectArray();
doa.push('dat.really.long.path', 'fixture');
console.log(doa.data);
// will output {dat:{really:{long:{path:"fixture"}}}}
```
You can safely [import](#import-data) or [push](#push-data) an ObjectArray into another ObjectArray at any level. The data will be safe.

### Import data
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
You can safely [import](#import-data) or [push](#push-data) an ObjectArray into another ObjectArray at any level. The data will be safe.

### Push and import in dataset
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
You can safely [import](#import-data) or [push](#push-data) an ObjectArray into another ObjectArray at any level. The data will be safe.

### Empty data and remove dataset
To remove the data linked to a key, simply call `remove` method while providing the key to delete
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
doa.remove('dat.long.dream');

console.log(doa.dataset('dat.long')) //Output {path: 'fixture1'}
```
Wider, the `empty` method is an alias to `remove` method if a key is provided but completely empty ObjectArray data if called without parameter.

### Getset to pull/push/import in one method
The getset method is a convenient shortcut that will get, set or import data given its parameters. See [getset reference](/class/src/index.js~ObjectArray.html#instance-method-getset) for examples.

## Utility methods
### Check key existence
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
### get length of a dataset
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

### Get array of keys or array of values of a dataset
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
### Flatten data and datasets
You can use the `flatten` method to flatten all underlying data levels to the root or a given key dataset. __Warning : The data of the ObjectArray will be flattened and it couldn't be undone without the dotted parameters set to true__.

```javascript
var doa = new ObjectArray({
  dat: {
    long: {
      path: 'fixture1',
      dream: 'fixture2'
    }
  }
});

// Flatten at root without path
doa.flatten();
console.log(doa.data); // Output {path: 'fixture1', dream: 'fixture2'}
// Flatten at root without path
doa.flatten(true);
console.log(doa.data); // Output {dat.long.path: 'fixture1', dat.long.dream: 'fixture2'}
```
### Clone
The `clone` method returns a brand new clone of the current ObjectArray. If you have flattened dotted keys, you can provide `false`as parameter to unflatten the data and restore the object hierarchy.
## Iterations
### forEach
The `forEach` method works exactly the same way than in the vanilla `Array` object.
The [callback](ForEachCallback) can take as much as four arguments.
A forEach call can be done only on a subset with a second parameter.
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
### reduce
The `reduce` method works exactly the same way than in the vanilla `Array`,
 except that the key and the path are provided to the callback function as a third and fourth parameters.

As forEach, reduce can be easily run on a subset instead at top-level with providing the key of the subset as second parameter. [See API for details](https://github.com/liqueurdetoile/DotObjectArray/blob/master/docs/api.md)

## Serializers
Embedded Serializers are provided for common cases. Each can be run on a dataset with providing the dotted key of the dataset as parameter.
### stylesToString
stylesToString will convert the dataset to a string suitable to a `style` attribute. Keys will be converted from camel-case to dash-case if needed.
```javascript
let doa = new ObjectArray({
  position: 'absolute',
  display: 'flex'
});

doa.styleString(): // returns 'position:absolute;display:flex'
```
### urlEncode
urlEncode will convert the dataset to a string suitable to a query part of an URI
```javascript
let doa = new ObjectArray({
  input: 'test',
  glob: '**/*',
  alias: 'test fixture'
});

doa.urlEncode(): // returns 'input=test&glob=**%2F*&alias=test%20fixture'
```
### formUrlEncode
formUrlEncode will convert the dataset to a string suitable for sending as a `form-url-encoded` data
```javascript
let doa = new ObjectArray({
  input: 'test',
  glob: '**/*',
  alias: 'test fixture'
});

doa.urlEncode(): // returns 'input=test&glob=**%2F*&alias=test+fixture'
```
## Parsers
### stringToStyles
stringToStyles will import a style-like string, split it into keys/values data and stores then into data. Keys will be converted from dash-case to camel-case if needed.
```javascript
let doa = new ObjectArray();

doa.stringToStyles('position:absolute;display:flex');

console.log(doa.data): // outputs {position: 'absolute', display: 'flex'}
```
## Helpers
### camelize
camelize will convert a string to camel-case by removing spaces or dashes and uppercasing following letter.
### dashize
camelize will convert a string to dash-case by replacing spaces with dashes and prepending dash to each capitalized first-letter and lowercase them/