
function CardsController($scope, $http) {
    $scope.title = "Test title";
    $scope.cards = [];
    $http.get('/api/values').then(function (data) {
        var cardArr = [];
        for (var i = 0; i < data.data.length; i++) {
            var card = new ModelCard(data.data[i]);
            cardArr.push(card);
        }

        $scope.cards = cardArr;
    });
}
