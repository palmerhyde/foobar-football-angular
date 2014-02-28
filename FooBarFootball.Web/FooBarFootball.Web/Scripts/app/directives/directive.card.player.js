fooBarControllers.directive('cardPlayer', [ function () {
    return {
        restrict: 'E',
        scope: {
            player: '=data'
        },
        templateUrl: 'Scripts/app/directives/views/card.player.html'
    };
}]);