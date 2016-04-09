const

module.exports = {

    VERSION: 'I LOVE UNICODE',

    bet_request: function(game_state, bet) {
        try {
            let player = game_state.players.find((p) => {
                return p.hole_cards && p.hole_cards.length > 0;
            });
            let myCards = player.hole_cards;


        } catch (e) {
            bet(10000);
        }
    },

    showdown: function(game_state) {

    }
};
