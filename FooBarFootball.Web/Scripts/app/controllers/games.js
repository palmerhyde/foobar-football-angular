fooBarControllers.controller('GamesController', ['$scope', '$http', '$firebase', function ($scope, $http, $firebase) {
    $scope.title = "FooBar Football - Games";

    // TODO: why is there a strongly coupled call to new Firebase when we have a $firebase instance passed by DI?
    // TODO: make a game service with 3 way binding
    var games = new Firebase("https://foobarfootball.firebaseio.com/Games");

    // TODO: replace 0 with user.id
    var user = new Firebase("https://foobarfootball.firebaseio.com/Users/0");
    var queues = new Firebase("https://foobarfootball.firebaseio.com/Queues/PlayPlayerCardFromHandToPitch");
    var userObject;

    // TODO: get the gameview from firebase.
    user.on('value', function (snapshot) {
        // TODO: replace snapshot.name() with user.id
        userObject = snapshot.name();
        $scope.game = snapshot.val().GameView;
        $scope.$apply();
    });

    $scope.games = $firebase(games);
;

    $scope.createGame = function () {
        // Push your manager / fb id if you are not already playing a game
        var gameId = games.push({ Id: "0", Name: "Liam Molloy", State: "Waiting" });

        // push game id to the manager
        user.child('Game').set(gameId.toString());
        user.child('IsPlaying').set(true);
        $scope.isPlaying = true;
    };

    $scope.joinGame = function (game) {
        console.log(game)
    };

    $scope.playPlayerCardFromHandToPitch = function (card) {
        var cardPlayed = queues.push({ GameId: 1, CardId: card.Id, UserId: userObject });
    };
    
    setTimeout(function() {
    	$( ".draggable" ).draggable({ containment: "#game", scroll: false });
    }, 1000);
    
}]);