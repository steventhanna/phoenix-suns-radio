var sails = require('sails'),
  sails;


describe('UserModel', function() {
  describe('#find()', function() {
    it('should check find function', function(done) {
      Useres.find().then(function(results) {
        // Perform some tests
        done();
      }).catch(done);
    });
  });
});