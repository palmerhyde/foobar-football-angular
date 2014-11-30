fooBarControllers.controller('MoveCardsController', ['$scope', '$http', '$firebase', function ($scope, $http, $firebase) {
    $scope.title = "FooBar Football - Move Cards";
    var cardsRef = new Firebase("https://foobarfootball.firebaseio.com/Moves");
    $scope.moves = $firebase(cardsRef);
}]);