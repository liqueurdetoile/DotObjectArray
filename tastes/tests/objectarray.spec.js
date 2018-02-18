import ObjectArray from 'index';

var expect = chai.expect;
var should = chai.should();
var assert = chai.assert;

console.log(ObjectArray);
describe('ObjectArray Class', function () {
  describe('ObjectArray Instance creation', function () {
    it('should create a void instance of ObjectArray', function () {
      let i = new ObjectArray();

      expect(i instanceof ObjectArray).to.equal(true);
    });
    it('should create a data instance of ObjectArray', function () {
      let i = new ObjectArray({
        test: 'fixture',
        test2: 'fixture2'
      });

      i.data.should.eql({
        test: 'fixture',
        test2: 'fixture2'
      });
    });
  });

  describe('ObjectArray getters', function () {
    it('should returns correct length', function () {
      let i = new ObjectArray();

      i.length.should.equal(0);
      i.push('test', 'fixture');
      i.length.should.equal(1);
      i.push('test2', 'fixture2');
      i.length.should.equal(2);
    });
    it('should returns keys', function () {
      let i = new ObjectArray();

      i.keys.should.eql([]);
      i.push('test', 'fixture');
      i.keys.should.eql(['test']);
      i.push('test2', 'fixture2');
      i.keys.should.eql(['test', 'test2']);
    });
    it('should returns values', function () {
      let i = new ObjectArray();

      i.values.should.eql([]);
      i.push('test', 'fixture');
      i.values.should.eql(['fixture']);
      i.push('test2', 'fixture2');
      i.values.should.eql(['fixture', 'fixture2']);
    });
  });

  describe('Has key, data fetch and parent data fetch', function () {
    it('should find key', function () {
      let i = new ObjectArray({
        test: 'fixture',
        test2: {
          test21: 'fixture21',
          test22: 'fixture22'
        }
      });

      i.has('test').should.equal(true);
      i.has('test2').should.equal(true);
      i.has('test2.test21').should.equal(true);
      i.has('test2.test22').should.equal(true);
      i.has('test3').should.equal(false);
      i.has('test2.test23').should.equal(false);
    });

    it('should find data', function () {
      let i = new ObjectArray({
        test: 'fixture',
        test2: {
          test21: 'fixture21',
          test22: 'fixture22'
        }
      });

      i.dataset('test').should.equal('fixture');
      i.dataset('test2').should.eql({
        test21: 'fixture21',
        test22: 'fixture22'
      });
      i.dataset('test2.test21').should.equal('fixture21');
      expect(i.dataset('test3')).to.equal(undefined);
      expect(i.dataset('test2.test23')).to.equal(undefined);
    });
    
    it('should find parent key', function () {
      let i = new ObjectArray({
        test: 'fixture',
        test2: {
          test21: 'fixture21',
          test22: 'fixture22'
        }
      });
      expect(i.parentKey('test')).to.equal(undefined);
      i.parentKey('test2.test21').should.equal('test2');
    });
  });

  describe('Push and delete data', function () {
    it('should push simple data', function () {
      let i = new ObjectArray();

      i.push('test', 'fixture');
      i._data.should.eql({test: 'fixture'});
    });
    it('should remove simple data', function () {
      let i = new ObjectArray();

      i.push('test', 'fixture');
      i.remove('test');
      i._data.should.eql({});
    });
    it('should push dotted data', function () {
      let i = new ObjectArray();

      i.push('test.dot', 'fixture')
       .push('test.dot2', 'fixture2')
      i._data.should.eql({test: {dot: 'fixture', dot2: 'fixture2'}});
    });
    it('should remove dotted data', function () {
      let i = new ObjectArray();

      i.push('test.dot', 'fixture')
       .push('test.dot2', 'fixture2')
       .remove('test.dot2')
       ._data.should.eql({test: {dot: 'fixture'}});
    });
  });

  describe('ObjectArray methods', function () {
    it('should iterate a callback with forEach', function () {
      let i = new ObjectArray();
      let ret = {};
      let indexes = [];

      i.import({
        test: 'fixture',
        test2: 'fixture2'
      });
      i.forEach(function (value, key, index) {
        ret[key] = value;
        indexes.push(index);
      });
      ret.should.eql({
        test: 'fixture',
        test2: 'fixture2'
      });
      indexes.should.eql([0, 1]);
    });

    it('should iterate a callback with forEach on a dotted key', function () {
      let i = new ObjectArray();
      let ret = {};
      let indexes = [];

      i.import({
        test: {
          test: 'fixture',
          test2: 'fixture2'
        }
      });
      i.forEach(function (value, key, index) {
        ret[key] = value;
        indexes.push(index);
      }, 'test');
      ret.should.eql({
        test: 'fixture',
        test2: 'fixture2'
      });
      indexes.should.eql([0, 1]);
    });

    it('should reduce the data', function () {
      let i = new ObjectArray({
        position: 'absolute',
        display: 'flex'
      });
      let ret = i.reduce(function (str, value, key) {
        return str += key + ':' + value + ';';
      }, '');

      ret.should.equal('position:absolute;display:flex;');
    });

    it('should return a style type string', function () {
      let i = new ObjectArray({
        position: 'absolute',
        display: 'flex'
      });
      let ret = i.styleString();

      ret.should.equal('position:absolute;display:flex');
    });

    it('should return a url encoded string', function () {
      let i = new ObjectArray({
        input: 'test',
        glob: '**/*',
        alias: 'test fixture'
      });
      let ret = i.urlEncode();

      ret.should.equal('input=test&glob=**%2F*&alias=test%20fixture');
    });

    it('should return a form url encoded string', function () {
      let i = new ObjectArray({
        input: 'test',
        glob: '**/*',
        alias: 'test fixture'
      });
      let ret = i.formUrlEncode();

      ret.should.equal('input=test&glob=**%2F*&alias=test+fixture');
    });
  });
});
