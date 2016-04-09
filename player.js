'use strict';
let combinations = require('./combinations')

const CARD_RANKS = {
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 11,
    'J': 12,
    'Q': 13,
    'K': 14,
    'A': 16
};

const GAME_CASES = [
    (c1, c2) => c1.rank === c2.rank ? 10 : 0,
    (c1, c2) => c1.suit === c2.suit ? 4 : 0,
    (c1, c2) => {
        let points = {1: 3, 2: 2, 3: 1};
        let distance = Math.abs(c1.rank - c2.rank);
        return points[distance] || 0;
    }
];

const HUTCHINSON_CONST = 30;
// const HUTCHINSON_CONST = 34;

function raiseCheck(cards) {
    for (let card of cards) {
        card.rank = CARD_RANKS[card.rank];
    }
    let points = cards[0].rank + cards[1].rank;
    for (let gameCaseFunc of GAME_CASES) {
        points += gameCaseFunc(cards[0], cards[1]) || 0;
    }
    if (points >= HUTCHINSON_CONST) {
        return true;
    }
    return false;
}

module.exports = {

    VERSION: 'I LOVE UNICODE',

    // утилиты
    raiseCheck: raiseCheck,

    bet_request: function(game_state, bet) {
        try {
            const players = game_state.players;
            const in_action = game_state.in_action;
            const bet = game_state.bet;
            const minimum_raise = game_state.minimum_raise;
            const current_buy_in = game_state.current_buy_in;
            const my_bet = players[in_action][bet];
            const community_cards = game_state.community_cards;
            const is_preflop = community_cards.length === 0;
            const player = players.players.find((p) => {
                return p.hole_cards && p.hole_cards.length > 0;
            });

            let minitmutRauseAmount = current_buy_in - my_bet + minimum_raise;

            let myCards = player.hole_cards;
            let communityCards = game_state.community_cards
            combinations.getBestCombination(myCards, communityCards);
            let iCanRaise = raiseCheck(myCards);
            if (iCanRaise) {
                return bet(minitmutRauseAmount);
            }
            return bet(0);
        } catch (e) {
            bet(10000);
        }
    },

    showdown: function(game_state) {

    }
};
