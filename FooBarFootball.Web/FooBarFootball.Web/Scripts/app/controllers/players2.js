fooBarControllers.controller('Player2CardsController', ['$scope', '$http', function ($scope, $http) {
    $scope.title = "FooBar Football - Player2 Cards";
    $scope.searchTerm = "";
    $scope.players = [];
    $http.get('/api/players2').then(function (data) {
        var playerArr = [];
        for (var i = 0; i < data.data.length; i++) {
            var player = new ModelPlayer2(data.data[i]);
            playerArr.push(player);
        }

        $scope.players = playerArr;
    });
}]);