fooBarControllers.controller('PokerPlayersCardsController', ['$scope', '$http', '$firebase', function ($scope, $http, $firebase) {
    $scope.title = "FooBar Football - Poker Player Cards";
    $scope.searchTerm = "";

    // TODO: why is there a strongly coupled call to new Firebase when we have a $firebase instance passed by DI?
    var cardsRef = new Firebase("https://foobarfootball.firebaseio.com/PokerCards");
    $scope.players = $firebase(cardsRef);
}]);