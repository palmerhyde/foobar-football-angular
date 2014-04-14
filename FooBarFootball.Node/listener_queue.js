var listen = function () {
    console.log('Listener: Queues');
    var ServiceFirebase = require('./service_firebase');
    var Firebase = require('firebase');
    var Q = require('q');
    var _ = require('underscore');
    var gameEndTurn = require('./game_end_turn');
    var gameResetGame = require('./game_reset_game');
    var gamePlayerToPitch = require('./game_player_to_pitch');
    var gamePlayerAttackManager = require('./game_player_attack_manager');
    var gamePlayerAttackPlayer = require('./game_player_attack_player');

    // TODO: can we refactor here to listen to the parent queue?
    var queueEndTurnRef = new Firebase('https://foobarfootball.firebaseio.com/Queues/EndTurn');
    var queueResetGameRef = new Firebase('https://foobarfootball.firebaseio.com/Queues/ResetGame');
    var queuePlayerToPitchRef = new Firebase('https://foobarfootball.firebaseio.com/Queues/PlayPlayerCardFromHandToPitch');
    var queuePlayerAttackManagerRef = new Firebase('https://foobarfootball.firebaseio.com/Queues/PlayerAttackManager');
    var queuePlayerAttackPlayerRef = new Firebase('https://foobarfootball.firebaseio.com/Queues/PlayerAttackPlayer');

    queueEndTurnRef.on('child_added', function (snapshot) {
        var userId = snapshot.val().UserId;
        var gameId = snapshot.val().GameId;

        var gamePromise = ServiceFirebase.Find("Games", gameId);
        var all = Q.all([gamePromise]);

        all.then(function() {
            var game = gamePromise.valueOf();
            var modifiedGame = gameEndTurn.playTurn(game, userId);
            ServiceFirebase.Set("Games", modifiedGame.Id, modifiedGame);
        });

        snapshot.ref().remove();
    });

    queueResetGameRef.on('child_added', function (snapshot) {
        var gameId = snapshot.val().GameId;
        var gamePromise = ServiceFirebase.Find("Games", gameId);
        var all = Q.all([gamePromise]);

        all.then(function() {
            var game = gamePromise.valueOf();
            gameResetGame.playTurn(game);
        });
        
        snapshot.ref().remove();
    });

    queuePlayerToPitchRef.on('child_added', function (snapshot) {
        var cardId = snapshot.val().CardId;
        var userId = snapshot.val().UserId;
        var gameId = snapshot.val().GameId;
        var gamePromise = ServiceFirebase.Find("Games", gameId);
        var all = Q.all([gamePromise]);

        all.then(function() {
            var game = gamePromise.valueOf();
            gamePlayerToPitch.playTurn(game, userId, cardId);
        });
        
        snapshot.ref().remove();
    });

    queuePlayerAttackManagerRef.on('child_added', function (snapshot) {
        var cardId = snapshot.val().CardId;
        var userId = snapshot.val().UserId;
        var gameId = snapshot.val().GameId;
        var gamePromise = ServiceFirebase.Find("Games", gameId);
        var all = Q.all([gamePromise]);

        all.then(function() {
            var game = gamePromise.valueOf();
            var modifiedGame = gamePlayerAttackManager.playTurn(game, userId, cardId);
            ServiceFirebase.Set("Games", modifiedGame.Id, modifiedGame);
        });
        
        snapshot.ref().remove();
    });

    queuePlayerAttackPlayerRef.on('child_added', function (snapshot) {
        var cardId = snapshot.val().CardId;
        var targetCardId =snapshot.val().TargetCardId;
        var userId = snapshot.val().UserId;
        var gameId = snapshot.val().GameId;
        var gamePromise = ServiceFirebase.Find("Games", gameId);
        var all = Q.all([gamePromise]);

        all.then(function() {
            var game = gamePromise.valueOf();
            gamePlayerAttackPlayer.playTurn(game, userId, cardId, targetCardId);
        });
        
        snapshot.ref().remove();
    });
};

exports.listen = listen;