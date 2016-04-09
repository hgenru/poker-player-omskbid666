'use strict';
const request = require('supertest');
const app = require('../player_service');
const example_json = require('./assets/tournament.json');

describe('server', function() {
    it('server is ok', function() {
        return request(app)
            .get('/')
            .expect(200);
    });

    it('server is return digit', function() {
        return request(app)
           	.post('/')
           	.send({ action: 'bet_request', game_state: JSON.stringify(example_json) })
            .expect(200, '10000');
    });
});
