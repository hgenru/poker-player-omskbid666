'use strict';
const player = require('./player');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get('/', function(req, res) {
    res.send(200, 'OK');
});

app.post('/', function(req, res) {
    if (req.body.action === 'bet_request') {
        player.bet_request(JSON.parse(req.body.game_state), function(bet) {
            res.send(200, bet.toString());
        });
    } else if (req.body.action === 'showdown') {
        player.showdown(JSON.parse(req.body.game_state));
        res.send(200, 'OK');
    } else if (req.body.action === 'version') {
        res.send(200, player.VERSION);
    } else {
        res.send(200, 'OK');
    }
});

module.exports = app;

if (!module.parents) {
    let port = parseInt(process.env['PORT'] || 1337);
    let host = '0.0.0.0';
    app.listen(port, host);
    console.log('Listening at http://' + host + ':' + port);
}
