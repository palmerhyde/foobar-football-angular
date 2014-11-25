fooBarControllers.directive('cardPlayerPitch', [ function () {
    return {
        restrict: 'E',
        scope: {
            player: '=data'
        },
        templateUrl: 'Scripts/app/directives/views/card.player-pitch.html'
    };
}]);