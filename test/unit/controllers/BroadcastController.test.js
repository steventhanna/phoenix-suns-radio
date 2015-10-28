// var request = require('supertest');
//
// describe('BroadcastController', function() {
//   describe("#new()", function() {
//     it('should create a new broadcast', function(done) {
//       request(sails.hooks.http.app)
//         .post('/broadcast/new')
//         .send({
//           title: 'Example Title',
//           embedCode: 'EmbedCode',
//           date: '11/12/13',
//           summary: 'This is an example summary statement',
//           bid: Math.floor(Math.random() * 1000000000000000000000)
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
//           bid: Math.floor(Math.random() * 1000000000000000000000)
//         })
//         .expect(500, done)
//     });
//   });
//
// });