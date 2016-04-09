'use strict';
const chai = require('chai'); chai.should();
const raiseChech = require('../player').raiseCheck;

describe('hudchinson', function() {
    describe('raise chech', function() {
        it('shoud not raise', function() {
            const HAND = [
                {
                    rank: '6',
                    suit: 'hearts'
                },
                {
                    rank: 'K',
                    suit: 'spades'
                }
            ];
            raiseChech(HAND).should.be.equal(false);
        });

        it('shoud raise', function() {
            const HAND = [
                {
                    rank: 'A',
                    suit: 'hearts'
                },
                {
                    rank: 'K',
                    suit: 'spades'
                }
            ];
            raiseChech(HAND).should.be.equal(32);
        });
    });
});
