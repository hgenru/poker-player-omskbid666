'use strict';
const chai = require('chai'); chai.should();
const bet_request = require('../player').bet_request;

describe('test 1vs1', function() {
    it('raise when you are bankrot', function(done) {
        const GAME_STATE = require('./assets/game-state-1vs1.json');
        function bet(amount) {
            amount.should.be.equal(10000);
            done();
        }
        bet_request(GAME_STATE, bet);
    });
});
