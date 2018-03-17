import ObjectArray from 'index';

/**
*  @test {ObjectArray#define}
*/
describe('ObjectArray define function', function () {
  let i = new ObjectArray({
    test: 'fixture',
    test2: {
      test21: 'fixture21',
      test22: 'fixture22'
    }
  });

  it('should create a default value for new key', function () {
    i.define('test3', 'fixture3');

    i._data['test3'].should.equal('fixture3');
  });

  it('should create a default value for new dotted key', function () {
    i.define('test41', 'fixture41', 'test4');

    i._data['test4']['test41'].should.equal('fixture41');
  });

  it('should not override existent value', function () {
    i.define('test', 'nope');

    i._data['test'].should.equal('fixture');
  });
});
