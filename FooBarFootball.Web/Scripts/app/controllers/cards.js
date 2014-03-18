fooBarControllers.controller('CardsController', ['$scope', '$http', 'ConfigPlayerAttributes', function ($scope, $http, ConfigPlayerAttributes) {
    var atts = ConfigPlayerAttributes.attributes;
    $scope.title = "FooBar Football - Cards";
    $scope.searchTerm = "";
    $scope.players = [];
    $scope.moves = [];
    
    atts.then(function (result) {
        $http.get('/api/players').then(function (data) {
            var playerArr = [];
            for (var i = 0; i < data.data.length; i++) {
                var player = new ModelPlayer(data.data[i], result);
                playerArr.push(player); 
            }

            $scope.players = playerArr;
        });
        $http.get('/api/moves').then(function (data) {
            var movesArr = [];
            for (var i = 0; i < data.data.length; i++) {
                var move = new ModelMove(data.data[i], result);
                movesArr.push(move);
            }
            $scope.moves = movesArr;
        });
    });
}]);