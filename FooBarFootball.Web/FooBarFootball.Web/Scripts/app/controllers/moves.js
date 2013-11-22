fooBarControllers.controller('MoveCardsController', ['$scope', '$http', 'ConfigPlayerAttributes', function ($scope, $http, ConfigPlayerAttributes) {
    var atts = ConfigPlayerAttributes.attributes;
    $scope.title = "FooBar Football - Move Cards";
    $scope.moves = [];
    atts.then(function(result) {
        $http.get('/api/moves').then(function(data) {
            var movesArr = [];
            for (var i = 0; i < data.data.length; i++) {
                var move = new ModelMove(data.data[i], result);
                movesArr.push(move);
            }
            $scope.moves = movesArr;
        });
    });
}]);