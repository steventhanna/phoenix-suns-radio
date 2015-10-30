// var request = require('supertest');
// var agent = request.agent;
//
// describe('BroadcastController', function() {
//   describe("#new()", function() {
//     var user;
//     before(function(done) {
//       // user = agent(sails.hook.http.app);
//       user
//       agent.post('/create-account')
//         .send({
//           username: 'example@email.com',
//           firstName: 'John',
//           lastName: 'Smith',
//           password: 'password',
//           accessCode: 'gorilla',
//           displayName: 'John Smith'
//         })
//         .expect('200', done);
//     });
//     it('should create a new broadcast', function(done) {
//       request(sails.hooks.http.app)
//       agent.post('/broadcast/new')
//         .send({
//           title: "Example Title",
//           date: "2015-10-19",
//           summary: "This is an example summary statement",
//           embedCode: "EmbedCode",
//         })
//         .expect(200, done)
//     });
//   });
//   describe("#new()", function() {
//     it('should fail to create a new broadcast', function(done) {
//       request(sails.hooks.http.app)
//         .post('/broadcast/new')
//         .send({
//           title: '',
//           embedCode: 'EmbedCode',
//           date: '11/12/13',
//           summary: 'This is an example summary statement',
//         })
//         .expect(500, done)
//     });
//   });
// });