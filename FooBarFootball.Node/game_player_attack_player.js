var playTurn = function playTurn(game, userId, cardId, targetCardId) {
    var ServiceFirebase = require('./service_firebase');
    var _ = require('underscore');
    var yourTeam;
    var opponentsTeam;
    
    if (game == null) {
        console.log('game not found');
    }

    if (game.WhosTurnIsIt != userId) {
        console.log('Its not your turn get out of here')
    }

    if (game.HomeTeam.UserId  == userId) {
        yourTeam = game.HomeTeam;
        opponentsTeam = game.AwayTeam;
    }

    if (game.AwayTeam.UserId  == userId) {
        yourTeam = game.AwayTeam;
        opponentsTeam = game.HomeTeam;
    }

    // get the cards from the pitch
    if (!yourTeam.Pitch) {
        yourTeam.Pitch = [];
    }
    var card = yourTeam.Pitch.filter(function( obj ) {
        return obj.Id == cardId;
    });

    if (!opponentsTeam.Pitch) {
        opponentsTeam.Pitch = [];
    }

     var targetCard = opponentsTeam.Pitch.filter(function( obj ) {
        return obj.Id == targetCardId;
    });

    if (card == null || card[0] == null)
    {
        console.log('card not found');
    }

    if (targetCard == null || targetCard[0] == null)
    {
        console.log('target card not found');
    }

    // play the move;
    card[0].Stamina = card[0].Stamina - targetCard[0].Attack;
    targetCard[0].Stamina = targetCard[0].Stamina - card[0].Attack;

    if (card[0].Stamina <= 0) {
        yourTeam.Pitch = _.without(yourTeam.Pitch, card[0]);
        // TODO: move to discard pile.
    }

    if (targetCard[0].Stamina <= 0) {
        opponentsTeam.Pitch = _.without(opponentsTeam.Pitch, targetCard[0]);
        // TODO: move to discard pile.
    }

    WarmUpPlayer(card[0]);

    // Save the actual game
    ServiceFirebase.Set("Games", game.Id, game);
}

// TODO: move to shared logic
function WarmUpPlayer(card) {
    if(card) {
        card.IsWarmingUp = true;
    }
}

exports.playTurn = playTurn;