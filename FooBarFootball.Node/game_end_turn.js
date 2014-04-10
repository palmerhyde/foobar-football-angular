var playTurn = function playTurn(game, userId) {
    var ServiceFirebase = require('./service_firebase');
    var _ = require('underscore');

    var yourTeam;
    var opponentsTeam;
    
    if (game == null) {
        console.log('game not found');
    }

    if (game.WhosTurnIsIt != userId) {
        console.log('Its not your turn get out of here');
    }

    if (game.HomeTeam.UserId  == userId) {
        yourTeam = game.HomeTeam;
        yourTeam.Mana = 0;
        opponentsTeam = game.AwayTeam;
        opponentsTeam.Mana = game.Turn;
        DealCard(opponentsTeam.Deck, opponentsTeam.Hand);
        WarmUpPlayers(opponentsTeam.Pitch);
    }

    if (game.AwayTeam.UserId  == userId) {
        game.Turn = game.Turn + 1;
        yourTeam = game.AwayTeam;
        yourTeam.Mana = 0;
        opponentsTeam = game.HomeTeam;
        opponentsTeam.Mana = game.Turn;
        DealCard(opponentsTeam.Deck, opponentsTeam.Hand);
        WarmUpPlayers(opponentsTeam.Pitch);
    }

    game.WhosTurnIsIt = opponentsTeam.UserId;

    // Save the actual game
    ServiceFirebase.Set("Games", game.Id, game);
}

function WarmUpPlayers(players) {
    if (players) {
        for (var i=0; i < players.length; i++) {
            players[i].IsWarmingUp = false;
        }
    }
}

// TODO: unit test this logic.
function DealCard(deck, hand) {
    if (deck && deck.length > 0) {

        if (!hand) {
            hand = [];
        }

        hand.push(deck[0]);
        deck.splice(0, 1);
    } 
}

exports.playTurn = playTurn;