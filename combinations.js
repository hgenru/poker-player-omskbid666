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

const COMBINATION = ['high', 'pair', 'two_pairs', 'three']

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
    var types = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    var values = cards.map(e => e.rank);
    var counts = types.map(c => countItems(values, c));
    var max = Math.max.apply(Math, counts);
    if (max === 2) {
        combs.push(PAIR);
    } else if (max === 3) {
        combs.push(THREE);
    }
    if (countItems(counts, 2) === 2) {
        combs.push(TWOPAIRS);
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
