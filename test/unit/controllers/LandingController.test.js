var request = require('supertest');

describe('LandingController', function() {
  describe("#home()", function() {
    it('should redirect to /', function(done) {
      request(sails.hooks.http.app)
        .post('/')
        .expect(200)
      done();
    });
  });
});