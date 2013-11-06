fooBarControllers.controller('PlayerCardsController', ['$scope', '$http', function ($scope, $http) {
    $scope.title = "FooBar Football - Player Cards";
    $scope.searchTerm = "";
    $scope.players = [];
    $http.get('/api/players').then(function (data) {
        var playerArr = [];
        for (var i = 0; i < data.data.length; i++) {
            var player = new ModelPlayer(data.data[i]);
            playerArr.push(player); 
        }

        $scope.players = playerArr;
    });
}]);