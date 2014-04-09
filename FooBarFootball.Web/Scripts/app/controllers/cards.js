fooBarControllers.controller('CardsController', ['$scope', '$http', '$firebase', function ($scope, $http, $firebase) {
    $scope.title = "FooBar Football - Cards";
    $scope.cards = [];

    var cardsRef = new Firebase("https://foobarfootball.firebaseio.com/Cards");
    $scope.cards = $firebase(cardsRef);
}]);