var sails = require('sails'),
  sails;


describe('UsersModel', function() {
  describe('#find()', function() {
    it('should check find function', function(done) {
      Useres.find().then(function(results) {
        // Perform some tests
        done();
      }).catch(done);
    });
  });
});