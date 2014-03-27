var listen = function () {
    console.log('Queue: PlayerAttackManager/');
    
    var ServiceFirebase = require('./service_firebase');
    var Firebase = require('firebase');
    var Q = require('q');
    var _ = require('underscore');
    
    var queueRef = new Firebase('https://foobarfootball.firebaseio.com/Queues/PlayerAttackManager');
    queueRef.on('child_added', function (snapshot) {
        var cardId = snapshot.val().CardId;
        var userId = snapshot.val().UserId;
        var gameId = snapshot.val().GameId;

        // TODO: get the real game
        var gamePromise = ServiceFirebase.Find("Games", "test");
        var all = Q.all([gamePromise]);

        all.then(function() {
            var game = gamePromise.valueOf();
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
            ServiceFirebase.Set("Games", "test", game);
        });

        snapshot.ref().remove();
    });
};

function WarmUpPlayer(card) {
    if(card) {
        card.IsWarmingUp = true;
    }
}

exports.listen = listen;