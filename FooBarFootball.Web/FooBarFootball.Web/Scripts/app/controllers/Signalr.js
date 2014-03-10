fooBarControllers.controller('SignalrController', ['$scope', '$http', 'signalr', 'facebook', function ($scope, $http, signalr, fb) {
    console.log("signalrController called...");
    fb.initialize();
    $scope.game = new ModelGame();
    signalr.initialize();
    $scope.$id += '-signalrController'


    $scope.joinGame = function () {
        $scope.game.waiting = true;
        $scope.game.message = "waiting to join game we should show a spinner.";
        var name = fb.username();
        signalr.join(name);
    }

    $scope.$parent.$on("join", function (e, message) {
        $scope.$apply(function () {
            updateGreetingMessage(message)
        });
    });

    $scope.$parent.$on("teamExists", function (e) {
        $scope.$apply(function () {
            $scope.game.message = "You are already playing a game.";
        });
    });

    $scope.$parent.$on("buildBoard", function (e, data) {
        $scope.$apply(function () {
            $scope.game.inGame = true;
            // TODO: this should be part of the $scope.game object.
            if (data != null) {
                $scope.game.message = data.HomeTeam.Name + " Vs " + data.AwayTeam.Name + " - At Stamford Bridge";
            }
        });
    });

    $scope.$parent.$on("waitingList", function (e) {
        $scope.$apply(function () {
            $scope.game.message = "Waiting for an oppenent...";
        });
    });
}]);