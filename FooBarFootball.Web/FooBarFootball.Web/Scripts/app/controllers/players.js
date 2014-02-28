fooBarControllers.controller('PlayerCardsController', ['$scope', '$http', 'ConfigPlayerAttributes', function ($scope, $http, ConfigPlayerAttributes) {
    var atts = ConfigPlayerAttributes.attributes;
    $scope.title = "FooBar Football - Player Cards";
    $scope.searchTerm = "";
    $scope.players = [];
    atts.then(function(result) {
        $http.get('/api/players').then(function (data) {
                var playerArr = [];
                for (var i = 0; i < data.data.length; i++) {
                    var player = new ModelPlayer(data.data[i], result);
                    playerArr.push(player); 
                }

                $scope.players = playerArr;
            });
    });
    
}]);