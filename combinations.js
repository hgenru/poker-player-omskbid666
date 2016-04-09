'use strict';

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
    '10': 10,
    'J': 11,
    'Q': 12,
    'K': 13,
    'A': 14
};

const HIGH = 0;
const PAIR = 1;
const TWOPAIRS = 2;
const THREE = 3;
const STRAIGHT = 4;
const FLUSH = 5;


const COMBINATION = ['high', 'pair', 'two_pairs', 'three', 'straight', 'flush']

var countItems = function(arr, what) {
    var count = 0;
    var i;
    while ((i = arr.indexOf(what, i)) !== -1) {
        ++count;
        ++i;
    }
    return count;
};

function mergeCards(player_hand, cards) {
    var all = player_hand.concat(cards);
    all = all.map((el) => {
        el.rank = CARD_RANKS[el.rank];
        return el;
    });
    all = all.sort((a, b) => a.rank - b.rank);
    return all;
};

function getAllCombinations(cards) {
    var combs = [];
    let types = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    let values = cards.map(e => e.rank);
    let counts = types.map(c => countItems(values, c));
    let max = Math.max.apply(Math, counts);
    if (max === 2) {
        combs.push(PAIR);
    } else if (max === 3) {
        combs.push(THREE);
    }
    if (countItems(counts, 2) === 2) {
        combs.push(TWOPAIRS);
    }
    var counter = 0;
    if (cards.length > 4) {
        for (var i = 0; i < counts.length; i++) {
            let c = counts[i];
            if (c > 0) {
                counter += 1;
            } else {
                counter = 0;
            }
            if (counter === 5) {
                combs.push(STRAIGHT);
                break;
            }
        }
        let cardSuites = cards.map(e => e.suit);
        let suits = ["clubs", "spades", "hearts", "diamonds"];
        let suitesCount = suits.map(c => countItems(cardSuites, c));
        if (Math.max.apply(Math, suitesCount) === 5) {
            combs.push(FLUSH);
        }
    }
    return combs;
};

function getBestCombination(player_hand, cards) {
    let all = mergeCards(player_hand, cards);
    console.log(all);
    let combs = getAllCombinations(all);
    console.log(combs);
    return COMBINATION[Math.max.apply(Math, combs)] || null;
};


module.exports = {
    getBestCombination: getBestCombination
}
