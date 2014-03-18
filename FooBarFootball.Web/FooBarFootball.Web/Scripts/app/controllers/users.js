fooBarControllers.controller('UsersController', ['$scope', '$http', function ($scope, $http) {
    // TODO: move firebase url to constant
    var root = new Firebase("https://foobarfootball.firebaseio.com");
    var auth = new FirebaseSimpleLogin(root, function (error, user) {
        if (error) {
            console.log(error);
            $scope.isLoggedIn = false;
        } else if (user) {
            $scope.user = user
            console.log(user);
            $scope.isLoggedIn = true;
            $scope.photoUrl = "http://graph.facebook.com/" + user.id + "/picture?width=32&height=32";
            $scope.$apply();
        } else {
            $scope.user = null;
            console.log("user is logged out");
            $scope.isLoggedIn = false;
            $scope.$apply();
        }
    });

    $scope.login = function () {
        auth.login('facebook');
    };

    $scope.logout = function () {
        auth.logout();
    };
}]);