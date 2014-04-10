fooBarControllers.controller('GamesController', ['$scope', '$http', '$firebase', '$routeParams', function ($scope, $http, $firebase, $routeParams) {
    $scope.title = "FooBar Football - Games";

        // TODO: replace 0 with user.id
    // TODO: Replace multi queues with big queue
    var user = new Firebase("https://foobarfootball.firebaseio.com/Users/" + $routeParams.id);
    var queues = new Firebase("https://foobarfootball.firebaseio.com/Queues/");
    var userObject;

    user.on('value', function (snapshot) {
        // TODO: replace snapshot.name() with user.id
        userObject = snapshot.name();
        $scope.game = snapshot.val().GameView;
        $scope.$apply();
    });

    
    $scope.playPlayerCardFromHandToPitch = function (card) {
        var cardPlayed = queues.child('PlayPlayerCardFromHandToPitch').push({ GameId: $scope.game.Id, CardId: card.Id, UserId: userObject });
    };

    $scope.playerAttackPlayer = function (card, targetCard) {
        var cardPlayed = queues.child('PlayerAttackPlayer').push({ GameId: $scope.game.Id, CardId: card.Id, TargetCardId: targetCard.Id, UserId: userObject });
    };

    $scope.playerAttackManager = function (card, targetCard) {
        var cardPlayed = queues.child('PlayerAttackManager').push({GameId: $scope.game.Id, CardId: card.Id, UserId: userObject });
    };

    $scope.endTurn = function (card) {
        var cardPlayed = queues.child('EndTurn').push({ GameId: $scope.game.Id, UserId: userObject });
    };

    $scope.resetGame = function () {
        var cardPlayed = queues.child('ResetGame').push({GameId: $scope.game.Id, UserId: userObject });
    };
    
    $( ".game-controls" ).draggable({ containment: "body" });
}]);