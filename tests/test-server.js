'use strict';
const request = require('supertest');
const app = require('../player_service');

describe('server', function() {
    it('server is ok', function() {
        request(app)
            .get('/')
            .expect(200);
    });
});
