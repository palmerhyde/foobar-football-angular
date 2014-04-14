var playTurn = function playTurn(game, userId) {
    var WarmUp = require('./effect_warmup');
    var Validate = require('./helper_validation.js');

    if (typeof game == 'undefined') {
        throw new Error('missing game parameter');
    }

    if (typeof userId == 'undefined') {
        throw new Error('missing userId parameter');
    }

    if (!Validate.validateGame(game)) {
        throw new Error('not a valid game');
    }

    var yourTeam;
    var opponentsTeam;
    
    if (game.WhosTurnIsIt != userId) {
        throw new Error('its not your turn');
    }

    if (game.HomeTeam.UserId  == userId) {
        yourTeam = game.HomeTeam;
        yourTeam.Mana = 0;
        opponentsTeam = game.AwayTeam;
        opponentsTeam.Mana = game.Turn;
        DealCard(opponentsTeam.Deck, opponentsTeam.Hand);
        WarmUp.warmUpPlayers(opponentsTeam.Pitch);
    }

    if (game.AwayTeam.UserId  == userId) {
        game.Turn = game.Turn + 1;
        yourTeam = game.AwayTeam;
        yourTeam.Mana = 0;
        opponentsTeam = game.HomeTeam;
        opponentsTeam.Mana = game.Turn;
        DealCard(opponentsTeam.Deck, opponentsTeam.Hand);
        WarmUp.warmUpPlayers(opponentsTeam.Pitch);
    }

    game.WhosTurnIsIt = opponentsTeam.UserId;

    return game;
}

function DealCard(deck, hand) {
    if (deck && deck.length > 0) {
        hand.push(deck[0]);
        deck.splice(0, 1);
    } 
}

exports.playTurn = playTurn;