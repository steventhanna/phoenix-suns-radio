var request = require('supertest');

describe('AuthController', function() {
  describe('#createAccount', function() {
    it('should create an account', function(done) {
      request(sails.hooks.http.app)
        .post('/create-account')
        .send({
          email: 'example@email.com',
          firstName: 'Bob',
          lastName: 'Smith',
          password: 'password',
          accessCode: 'gorilla',
          displayName: 'Bob Smith'
        })
        .expect(200, done)
        // done()
    });
  });
  describe('#createAccount', function() {
    it('should fail to create an account', function(done) {
      request(sails.hooks.http.app)
        .post('/create-account')
        .send({
          email: 'example@email.com',
          firstName: 'Bob',
          lastName: 'Smith',
          password: 'password',
          accessCode: 'zebra',
          displayName: 'Bob Smith'
        })
        .expect(500, done)
    });
  });
});