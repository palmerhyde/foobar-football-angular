fooBarControllers.controller('GamesController', ['$scope', '$http', '$firebase', '$routeParams', function ($scope, $http, $firebase, $routeParams) {
    $scope.title = "FooBar Football - Games";

        // TODO: replace 0 with user.id
    // TODO: Replace multi queues with big queue
    var user = new Firebase("https://foobarfootball.firebaseio.com/Users/" + $routeParams.id);
    var queues = new Firebase("https://foobarfootball.firebaseio.com/Queues/PlayPlayerCardFromHandToPitch");
    var queue_playerAttackPlayer = new Firebase("https://foobarfootball.firebaseio.com/Queues/PlayerAttackPlayer");
    var queue_endTurn = new Firebase("https://foobarfootball.firebaseio.com/Queues/EndTurn");
    var queue_resetGame = new Firebase("https://foobarfootball.firebaseio.com/Queues/ResetGame");
    var userObject;

    user.on('value', function (snapshot) {
        // TODO: replace snapshot.name() with user.id
        userObject = snapshot.name();
        $scope.game = snapshot.val().GameView;
        $scope.$apply();
    });
    
    $scope.playPlayerCardFromHandToPitch = function (card) {
        var cardPlayed = queues.push({ GameId: 1, CardId: card.Id, UserId: userObject });
    };

    $scope.playerAttackPlayer = function (card, targetCard) {
        var cardPlayed = queue_playerAttackPlayer.push({ GameId: "test", CardId: card.Id, TargetCardId: targetCard.Id, UserId: userObject });
    };

    $scope.endTurn = function (card) {
        var cardPlayed = queue_endTurn.push({ GameId: "test", UserId: userObject });
    };

    $scope.resetGame = function () {
        var cardPlayed = queue_resetGame.push({ GameId: "test", UserId: userObject });
    };
}]);