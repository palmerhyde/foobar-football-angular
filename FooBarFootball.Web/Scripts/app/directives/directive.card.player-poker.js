fooBarControllers.directive('cardPlayerPoker', [ function () {
    return {
        restrict: 'E',
        scope: {
            player: '=data'
        },
        templateUrl: 'Scripts/app/directives/views/card.player-poker.html'
    };
}]);