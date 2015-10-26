var request = require('supertest');

describe('UserController', function() {
  describe("#admin()", function() {
    it('should redirect to /admin', function(done) {
      request(sails.hooks.http.app)
        .get('/admin')
        .expect('location', '/admin', done);
    });
  });
});