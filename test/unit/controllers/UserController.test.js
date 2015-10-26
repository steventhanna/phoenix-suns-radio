var request = require('supertest');

describe('UserController', function() {
  describe("#admin()", function() {
    it('should redirect to /admin', function(done) {
      request(sails.hooks.http.app)
        .get('/admin')
        .expect(200, done)
    });
  });
  describe("#createAccount()", function() {
    it('should redirect to /create-account', function(done) {
      request(sails.hooks.http.app)
        .get('/create-account')
        .expect(200, done)
    });
  });
});