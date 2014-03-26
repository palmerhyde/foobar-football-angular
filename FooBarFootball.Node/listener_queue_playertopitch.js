var listen = function () {
    console.log('Queue: PlayPlayerCardFromHandToPitch/');
    
    var ServiceFirebase = require('./service_firebase');
    var Firebase = require('firebase');
    var Q = require('q');
    var _ = require('underscore');
    
    var queueRef = new Firebase('https://foobarfootball.firebaseio.com/Queues/PlayPlayerCardFromHandToPitch');
    queueRef.on('child_added', function (snapshot) {
        var cardId = snapshot.val().CardId;
        var userId = snapshot.val().UserId;
        var gameId = snapshot.val().GameId;

        var gamePromise = ServiceFirebase.Find("Games", "test");

        var all = Q.all([gamePromise]);

        all.then(function() {
            var game = gamePromise.valueOf();
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

                // save yourteam back up to the game
                // TODO: use actual game id instead of test.
                ServiceFirebase.Set("Games", "test", game);
            }
        });

        snapshot.ref().remove();
    });
};

function warmUpPlayer(card) {
    if(card) {
        card.IsWarmingUp = true;
    }
}

exports.listen = listen;