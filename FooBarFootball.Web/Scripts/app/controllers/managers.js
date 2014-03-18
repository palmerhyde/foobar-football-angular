fooBarControllers.controller('ManagerCardsController', ['$scope', '$http', function ($scope, $http) {
    $scope.title = "FooBar Football - Manager Cards";
    $scope.managers = [];
    
    $http.get('/api/managers').then(function(data) {
        var managersArr = [];
        for (var i = 0; i < data.data.length; i++) {
            var manager = new ModelManager(data.data[i]);
            managersArr.push(manager);
        }
        $scope.managers = managersArr;
    });
}]);