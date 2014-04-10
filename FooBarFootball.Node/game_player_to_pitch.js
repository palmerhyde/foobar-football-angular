var playTurn = function playTurn(game, userId, cardId) {
    var ServiceFirebase = require('./service_firebase');
    var _ = require('underscore');
    var yourTeam;
            
    if (game == null) {
        console.log('game not found');
    }

    if (game.WhosTurnIsIt != userId) {
        console.log('Its not your turn get out of here');
    }

    if (game.HomeTeam.UserId  == userId) {
        yourTeam = game.HomeTeam;
    }

    if (game.AwayTeam.UserId  == userId) {
        yourTeam = game.AwayTeam;
    }

    // get the card from your hand
    if (!yourTeam.Hand) {
        yourTeam.Hand = [];
    }
    var card = yourTeam.Hand.filter(function( obj ) {
        return obj.Id == cardId;
    });

    if (card == null || card[0] == null)
    {
        console.log('card not found');
    }

    // Is this move legal?
    if (yourTeam.Mana >= card[0].Cost)
    {
        if (!yourTeam.Pitch)
        {
            yourTeam.Pitch = [];
        }

        yourTeam.Pitch.push(card[0]);
        yourTeam.Hand = _.without(yourTeam.Hand, card[0]);
        yourTeam.Mana = yourTeam.Mana - card[0].Cost;
        warmUpPlayer(card[0]);
        ServiceFirebase.Set("Games", game.Id, game);
    }
}

// TODO: move to shared logic
function warmUpPlayer(card) {
    if(card) {
        card.IsWarmingUp = true;
    }
}

exports.playTurn = playTurn;