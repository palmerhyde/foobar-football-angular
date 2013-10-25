fooBarApp.controller('CardsController', ['$scope', '$http', function($scope, $http) {
    $scope.title = "FooBar Football - Cards";
    $scope.searchTerm = "";
    $scope.players = [];
    $scope.moves = [];
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
}]);