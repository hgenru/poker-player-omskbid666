'use strict';
const chai = require('chai'); chai.should();
const expect = chai.expect;
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
            getBestCombination(HAND, TABLE).should.be.equal(1);
        });
        it('best is null', function() {
            const HAND = [
                {
                    rank: '6',
                    suit: 'spades'
                }
            ];
            const TABLE = [
                {
                    rank: 'A',
                    suit: 'spades'
                }
            ];
            expect(getBestCombination(HAND, TABLE)).to.be.equal(null);
        });
        it('best is three', function() {
            const HAND = [
                {
                    rank: 'A',
                    suit: 'spades'
                }
            ];
            const TABLE = [
                {
                    rank: 'A',
                    suit: 'spades'
                },
                {
                    rank: 'A',
                    suit: 'spades'
                },
                {
                    rank: '7',
                    suit: 'spades'
                }
            ];
            expect(getBestCombination(HAND, TABLE)).to.be.equal(3);
        });
        it('best is two pairs', function() {
            const HAND = [
                {
                    rank: 'J',
                    suit: 'spades'
                },
                {
                    rank: '7',
                    suit: 'hearts'
                }
            ];
            const TABLE = [
                {
                    rank: 'J',
                    suit: 'hearts'
                },
                {
                    rank: 'A',
                    suit: 'spades'
                },
                {
                    rank: '7',
                    suit: 'spades'
                }
            ];
            expect(getBestCombination(HAND, TABLE)).to.be.equal(2);
        });
        it('best is straight', function() {
            const HAND = [
                {
                    rank: '2',
                    suit: 'spades'
                },
                {
                    rank: '3',
                    suit: 'hearts'
                }
            ];
            const TABLE = [
                {
                    rank: '4',
                    suit: 'hearts'
                },
                {
                    rank: '5',
                    suit: 'spades'
                },
                {
                    rank: '6',
                    suit: 'spades'
                }
            ];
            expect(getBestCombination(HAND, TABLE)).to.be.equal(4);
        });
        it('best is flush', function() {
            const HAND = [
                {
                    rank: '2',
                    suit: 'spades'
                },
                {
                    rank: '3',
                    suit: 'spades'
                }
            ];
            const TABLE = [
                {
                    rank: '4',
                    suit: 'spades'
                },
                {
                    rank: '5',
                    suit: 'spades'
                },
                {
                    rank: '6',
                    suit: 'spades'
                }
            ];
            expect(getBestCombination(HAND, TABLE)).to.be.equal(5);
        });
        it('best is full house', function() {
            const HAND = [
                {
                    rank: '2',
                    suit: 'spades'
                },
                {
                    rank: '2',
                    suit: 'hearts'
                }
            ];
            const TABLE = [
                {
                    rank: '4',
                    suit: 'hearts'
                },
                {
                    rank: '4',
                    suit: 'spades'
                },
                {
                    rank: '4',
                    suit: 'diamonds'
                }
            ];
            expect(getBestCombination(HAND, TABLE)).to.be.equal(6);
        });
    });
});
