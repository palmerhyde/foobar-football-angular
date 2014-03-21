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

        var userPromise = ServiceFirebase.Find("Users", userId);
        var gamePromise = ServiceFirebase.Find("Games", "test");

        var all = Q.all([userPromise, gamePromise]);

        all.then(function() {
            var user = userPromise.valueOf();
            var game = gamePromise.valueOf();
            var yourTeam;
            var opponentsTeam;
            var homeUser;
            var awayUser;

            if (game == null || user == null) {
                console.log('game or user not found');
            }


            if (game.WhosTurnIsIt != userId) {
                console.log('Its not your turn get out of here')
            }

            if (game.HomeTeam.UserId != userId && game.AwayTeam.UserId != userId) {
                console.log('invalid userId');
            }

            if (game.HomeTeam.UserId  == userId) {
                console.log('message from the home team');
                yourTeam = game.HomeTeam;
                opponentsTeam = game.AwayTeam;
            }

            if (game.AwayTeam.UserId  == userId) {
                console.log('message from the away team');
                yourTeam = game.AwayTeam;
                opponentsTeam = game.TeamTeam;
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

                // save yourteam back up to the game
                 ServiceFirebase.Set("Games", "test", game);
            }
        });

        snapshot.ref().remove();
    });
};
exports.listen = listen;