
function CardsController($scope, $http) {
    $scope.title = "Test title";
<<<<<<< HEAD
    $scope.cards = [];
    $http.get('/api/values').then(function (data) {
=======
    $scope.searchTerm = "";
    $scope.cards = [];
    $http.get('/api/players').then(function (data) {
>>>>>>> c2f75e6cc614383e4bb8b0cb58227b9cba1a6f66
        var cardArr = [];
        for (var i = 0; i < data.data.length; i++) {
            var card = new ModelCard(data.data[i]);
            cardArr.push(card);
        }

        $scope.cards = cardArr;
    });
}
