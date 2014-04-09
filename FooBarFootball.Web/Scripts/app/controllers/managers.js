fooBarControllers.controller('ManagerCardsController', ['$scope', '$http', '$firebase', function ($scope, $http, $firebase) {
    $scope.title = "FooBar Football - Managers";
    $scope.managers = [];

    var managersRef = new Firebase("https://foobarfootball.firebaseio.com/Managers");
    $scope.managers = $firebase(managersRef);
}]);