var playTurn = function playTurn(game, userId, cardId) {
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

            if (card == null || card[0] == null)
            {
                console.log('card not found');
            }

            // play the move;
            opponentsTeam.Manager.Stamina = opponentsTeam.Manager.Stamina - card[0].Attack;

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