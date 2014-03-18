fooBarControllers.directive('cardMove', [ function () {
    return {
        restrict: 'E',
        scope: {
            move: '=data'
        },
        templateUrl: 'Scripts/app/directives/views/card.move.html'
    };
}]);