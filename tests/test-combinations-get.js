'use strict';
const chai = require('chai'); chai.should();
const getBestCombination = require('../combinations').getBestCombination;

describe('combinations', function() {
    describe('best', function() {
        it('best is pair', function() {
            const HAND = [
                {
                    rank: '6',
                    suit: 'spades'
                }
            ];
            const TABLE = [
                {
                    rank: '6',
                    suit: 'spades'
                }
            ];
            getBestCombination(HAND, TABLE).should.be.equal('pair');
        });
    });
});
