fooBarControllers.controller('SignalrController', ['$scope', '$http', 'signalr', 'facebook', function ($scope, $http, signalr, fb) {
    fb.initialize();
    $scope.game = new ModelGame();
    signalr.initialize();
    


    $scope.joinGame = function () {
        $scope.game.waiting = true;
        $scope.game.message = "waiting to join game we should show a spinner.";
        var name = fb.username();
        signalr.join(name);
    }

    updateGreetingMessage = function (message, ingame) {
        $scope.game.message = message;
        $scope.game.inGame = ingame;
    }

    $scope.$parent.$on("join", function (e, message) {
        $scope.message = message
        $scope.$apply(function () {
            updateGreetingMessage(message)
        });
    });

    $scope.$parent.$on("playerJoined", function (e) {
        $scope.$apply(function () {
            updateGreetingMessage("Joined game...")
        });
    });

    $scope.$parent.$on("teamExists", function (e) {
        $scope.$apply(function () {
            updateGreetingMessage("You are already playing a game.")
        });
    });

    $scope.$parent.$on("buildBoard", function (e) {
        $scope.$apply(function () {
            updateGreetingMessage("If I knew how the pitch would now be visible.", true)
        });
    });

    $scope.$parent.$on("waitingList", function (e) {
        $scope.$apply(function () {
            updateGreetingMessage("Waiting for an oppenent...")
        });
    });
}]);