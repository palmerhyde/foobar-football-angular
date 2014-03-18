var listen = function () {
    console.log('Queue: PlayPlayerCardFromHandToPitch/');
    var Firebase = require('firebase');
    var queueRef = new Firebase('https://foobarfootball.firebaseio.com/Queues/PlayPlayerCardFromHandToPitch');
    queueRef.on('child_added', function (snapshot) {
        console.log(snapshot.val());
        var cardId = snapshot.val().CardId;
        var userId = snapshot.val().UserId;
        var gameId = snapshot.val().GameId;
        var user;
        var game;

        // Get the users gameview (this is async, how do we handle this?)
        var userRef = new Firebase('https://foobarfootball.firebaseio.com/Users/' + userId);
        userRef.on('value', function (snapshot) {
            console.log(snapshot.val());
            user = snapshot.val();
        });

        // Get the game (this is async, how do we handle this?)
        var gameRef = new Firebase('https://foobarfootball.firebaseio.com/Games/' + gameId);
        gameRef.on('value', function (snapshot) {
            console.log(snapshot.val());
            game = snapshot.val();

            // Home or away team?
            if (userId == snapshot.child('HomeTeamUserId').val()){
                console.log('HOME TEAM!!!');
            }

            if (userId == snapshot.child('AwayTeamUserId').val()){
                console.log('AWAY TEAM!!!');
            }
        });

        // Is this move legal?

        // Get the opponents game view

        // Update home team game view
        // Update away team game view



        // Now the message has been processed, remove it from the queue.
        // This is async - it will most likely fire before most things in this module.
        snapshot.ref().remove();
    });
};
exports.listen = listen;


