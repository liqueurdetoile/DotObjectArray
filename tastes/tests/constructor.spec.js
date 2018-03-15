import ObjectArray from 'index';

/**
*  @test {ObjectArray#constructor}
*/
describe('ObjectArray constructor', function () {
  it('should create a void instance of ObjectArray', function () {
    let i = new ObjectArray();

    i.should.be.instanceof(ObjectArray);
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

  it('should create a nested data instance of ObjectArray', function () {
    let i = new ObjectArray({
      test: 'fixture',
      test2: {
        test21: 'fixture21',
        test22: 'fixture22'
      }
    });

    i.data.should.eql({
      test: 'fixture',
      test2: {
        test21: 'fixture21',
        test22: 'fixture22'
      }
    });
  });

  it('should preserve ObjectArray data if ObjectArray is given in arguments', function () {
    let i = new ObjectArray({
      test: 'fixture',
      test2: 'fixture2'
    });

    let j = new ObjectArray(i);

    j.data.should.eql({
      test: 'fixture',
      test2: 'fixture2'
    });
  });
});
