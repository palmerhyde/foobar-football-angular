fooBarControllers.directive('cardTactic', [ function () {
    return {
        restrict: 'E',
        scope: {
            tactic: '=data'
        },
        templateUrl: 'Scripts/app/directives/views/card.tactic.html'
    };
}]);