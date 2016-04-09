'use strict';
const request = require('supertest');
const app = require('../player_service');
const example_json = require('./assets/tournament.json');

// describe('server', function() {
//     it('server is ok', function(done) {
//         request(app)
//             .get('/')
//             .expect(200, done);
//     });
//
//     it('server is return digit', function(done) {
//         return request(app)
//             .post('/')
//             .send({
//                 action: 'bet_request',
//                 game_state: JSON.stringify(example_json)
//             })
//             .expect(200, function(res) {
//                 let amount = parseInt(res.body);
//                 amount.should.be.a('number');
//             }, done);
//     });
// });
