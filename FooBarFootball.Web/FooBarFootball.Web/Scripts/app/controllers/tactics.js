fooBarControllers.controller('TacticCardsController', ['$scope', '$http', function ($scope, $http) {
    $scope.title = "FooBar Football - Tactic Cards";
    $scope.moves = [];
    $http.get('/api/tactics').then(function (data) {
        var tacticsArr = [];
        for (var i = 0; i < data.data.length; i++) {
            var tactic = new ModelTactic(data.data[i]);
            tacticsArr.push(tactic);
        }
        $scope.tactics = tacticsArr;
    });
}]);