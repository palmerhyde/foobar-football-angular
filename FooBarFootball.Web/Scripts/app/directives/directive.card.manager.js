fooBarControllers.directive('cardManager', [ function () {
    return {
        restrict: 'E',
        scope: {
            manager: '=data'
        },
        templateUrl: 'Scripts/app/directives/views/card.manager.html'
    };
}]);