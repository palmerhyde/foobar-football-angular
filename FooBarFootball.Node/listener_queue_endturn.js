var listen = function () {
    console.log('Queue: End Turn');
    
    var ServiceFirebase = require('./service_firebase');
    var Firebase = require('firebase');
    var Q = require('q');
    var _ = require('underscore');
    
    var queueRef = new Firebase('https://foobarfootball.firebaseio.com/Queues/EndTurn');
    queueRef.on('child_added', function (snapshot) {
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
                console.log('Its not your turn get out of here');
            }

            if (game.HomeTeam.UserId  == userId) {
                yourTeam = game.HomeTeam;
                yourTeam.Mana = 0;
                opponentsTeam = game.AwayTeam;
                opponentsTeam.Mana = game.Turn;
                DealCard(opponentsTeam.Deck, opponentsTeam.Hand);
            }

            if (game.AwayTeam.UserId  == userId) {
                game.Turn = game.Turn + 1;
                yourTeam = game.AwayTeam;
                yourTeam.Mana = 0;
                opponentsTeam = game.HomeTeam;
                opponentsTeam.Mana = game.Turn;
                DealCard(opponentsTeam.Deck, opponentsTeam.Hand);
            }

            game.WhosTurnIsIt = opponentsTeam.UserId;

            // Save the actual game
            ServiceFirebase.Set("Games", "test", game);
        });

        snapshot.ref().remove();
    });
};

function DealCard(deck, hand) {
    if (deck.length > 0 ) {
        hand.push(deck[0]);
        deck.splice(0, 1);
    } 
}

exports.listen = listen;