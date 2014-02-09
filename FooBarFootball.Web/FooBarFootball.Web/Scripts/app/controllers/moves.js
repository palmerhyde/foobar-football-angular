fooBarControllers.controller('MoveCardsController', ['$scope', '$http', function ($scope, $http) {
    $scope.title = "FooBar Football - Move Cards";
    $scope.moves = [];
    
    $http.get('/api/moves').then(function(data) {
        var movesArr = [];
        for (var i = 0; i < data.data.length; i++) {
            var move = new ModelMove(data.data[i]);
            movesArr.push(move);
        }
        $scope.moves = movesArr;
    });
}]);