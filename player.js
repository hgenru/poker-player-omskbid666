'use strict';
const combinations = require('./combinations');

const MAX_BET = 10000;

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

function raiseCheck(rawCards) {
    let cards = [];
    for (let card of rawCards) {
        cards.push({
            suit: card.suit,
            rank: CARD_RANKS[card.rank]
        });
    }
    let points = (cards[0].rank + cards[1].rank) || 32;
    for (let gameCaseFunc of GAME_CASES) {
        points += gameCaseFunc(cards[0], cards[1]) || 0;
    }
    console.log('HUTCHINSON POINTS', points, cards);
    if (points >= HUTCHINSON_CONST) {
        return points;
    }
    return false;
}

module.exports = {

    VERSION: 'I LOVE UNICODE',

    // утилиты
    raiseCheck: raiseCheck,

    bet_request: function(game_state, betCallback) {
        try {
            const players = game_state.players;
            const minimum_raise = game_state.minimum_raise;
            const current_buy_in = game_state.current_buy_in;
            const community_cards = game_state.community_cards;
            const small_blind = game_state.small_blind;
            const big_blind = small_blind * 2;
            const is_preflop = community_cards.length === 0;
            const player = players[game_state.in_action];
            //
            const my_bet = player.bet;
            const my_stack = player.stack;
            const my_cards = player.hole_cards;

            const active_player_count = players.filter(
                e => e.status === 'active').length;
            const folded_player_count = players.filter(
                e => e.status === 'folded').length;

            let minimumRaiseAmount = current_buy_in - my_bet + minimum_raise;
            let isRaiseRacing = my_bet > (my_stack / 3);
            let isPotentialRaiseRacing = (
                minimumRaiseAmount + my_bet) > big_blind * 2;

            if (minimumRaiseAmount < (my_bet / 10)) {
                return betCallback(minimumRaiseAmount);
            }

            if (
                (game_state.dealer === game_state.in_action) &&
                (folded_player_count === (players.length - 1))) {
                return betCallback(minimumRaiseAmount);
            }

            let combination = combinations
                .getBestCombination(my_cards, community_cards);

            // Если у нас уже кончаются деньги, то мы пытаемся уйти в all-win
            if (big_blind > my_stack) {
                return betCallback(MAX_BET);
            }

            if (is_preflop) {
                let myCards = player.hole_cards;
                let iCanRaise = raiseCheck(myCards);
                if (iCanRaise > 34 && minimum_raise > 1000) {
                    raiseCheck(MAX_BET);
                }
                if (iCanRaise) {
                    return betCallback(minimumRaiseAmount);
                }
            }

            if (active_player_count < 5 && combination >
                    2 && (my_stack < (big_blind * 3))) {
                return betCallback(MAX_BET);
            }

            if (active_player_count < 3 && combination > 3) {
                return betCallback(MAX_BET);
            }

            if (active_player_count < 3 && combination > 3) {
                return betCallback(MAX_BET);
            }

            // Стараемся не сжигать деньги
            if (isRaiseRacing) {
                return betCallback(0);
            }

            if (combination > 3 && !isPotentialRaiseRacing) {
                return betCallback(minimumRaiseAmount);
            } else if (combination > 4) {
                return betCallback(minimumRaiseAmount);
            }

            // get_hands(myCards, communityCards);
            return betCallback(0);
        } catch (e) {
            console.error(e);
            betCallback(MAX_BET);
        }
    },

    showdown: function(game_state) {

    }
};
