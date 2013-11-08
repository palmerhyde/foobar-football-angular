fooBarControllers.controller('SimulatorMovesController', ['$scope', '$http', function ($scope, $http) {
    $scope.players = [];
    $scope.moves = [];
    $scope.simResult = new ModelPlayMoveResult({});
    $http.get('/api/players').then(function (data) {
        var playerArr = [];
        for (var i = 0; i < data.data.length; i++) {
            var player = new ModelPlayer(data.data[i]);
            playerArr.push(player);
        }

        $scope.players = playerArr;
    });
    $http.get('/api/moves').then(function (data) {
        var movesArr = [];
        for (var i = 0; i < data.data.length; i++) {
            var move = new ModelMove(data.data[i]);
            movesArr.push(move);
        }
        $scope.moves = movesArr;
    });
    $scope.simulate = function (attackPlayerId, defendPlayerId, moveCardId) {
        $http.get('/api/play?AttackingPlayerId=' + attackPlayerId + '&DefendingPlayerId=' + defendPlayerId + '&MoveId=' + moveCardId).then(function (data) {
            $scope.simResult = new ModelPlayMoveResult({ winner: data.data.Winner });
        });
    };
}]);