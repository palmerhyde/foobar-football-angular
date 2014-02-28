fooBarControllers.directive('cardPlayer2', [ function () {
    return {
        restrict: 'E',
        scope: {
            player: '=data'
        },
        templateUrl: 'Scripts/app/directives/views/card.player2.html'
    };
}]);