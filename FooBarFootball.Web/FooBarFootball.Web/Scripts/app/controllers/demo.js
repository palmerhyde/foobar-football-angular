fooBarControllers.controller('DemoController', ['$scope', '$http', 'ConfigGameSettings', function ($scope, $http, ConfigGameSettings) {
    $scope.title = "FooBar Football - Demo";
    var players = [],
        moves = [],
        tactics = [],
        managers = [];
    $scope.deck = [];
    $scope.hand = [];
    $scope.manager = null;
    $scope.generateDeckClick = false;
    $scope.dealHandClick = false;

    $http.get('/api/tactics').then(function (data) {
        var tacticsArr = [];
        for (var i = 0; i < data.data.length; i++) {
            var tactic = new ModelTactic(data.data[i]);
            tacticsArr.push(tactic);
        }
        tactics = tacticsArr;
    });

    $http.get('/api/moves').then(function (data) {
        var movesArr = [];
        for (var i = 0; i < data.data.length; i++) {
            var move = new ModelMove(data.data[i]);
            movesArr.push(move);
        }
        moves = movesArr;
    });

    $http.get('/api/players2').then(function (data) {
        var playerArr = [];
        for (var i = 0; i < data.data.length; i++) {
            var player = new ModelPlayer2(data.data[i]);
            playerArr.push(player);
        }

        players = playerArr;
    });

    $http.get('/api/managers').then(function (data) {
        var managersArr = [];
        for (var i = 0; i < data.data.length; i++) {
            var manager = new ModelManager(data.data[i]);
            managersArr.push(manager);
        }
        managers = managersArr;
    });

    $scope.generateDeck = function() {
        players = players.shuffle();
        moves = moves.shuffle();
        tactics = tactics.shuffle();
        managers = managers.shuffle();

        $scope.deck = $scope.deck.concat(tactics.slice(0, 4));
        $scope.deck = $scope.deck.concat(moves.slice(0, 9));
        $scope.deck = $scope.deck.concat(players.slice(0, 16));
        $scope.deck = $scope.deck.shuffle();


        $scope.manager = managers[0];
        $scope.generateDeckClick = true;
    };

    $scope.dealCards = function() {
        for (var i = 0; i < ConfigGameSettings.handSize; i++) {
            $scope.hand.push($scope.deck[i]);
            $scope.deck.shift();
        }
        $scope.dealHandClick = true;
    };
    
    $scope.dealNextCard = function () {
        if ($scope.deck.length > 0) {
            $scope.hand.push($scope.deck[0]);
            $scope.deck.shift();
        }
    };
}]);