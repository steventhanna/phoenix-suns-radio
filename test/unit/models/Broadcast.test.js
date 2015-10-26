var sails = require('sails'),
  sails;


describe('BroadcastModel', function() {
  describe('#find()', function() {
    it('should check find function', function(done) {
      Broadcast.find().then(function(results) {
        // Perform some tests
        done();
      }).catch(done);
    });
  });
});