fooBarApp.factory('ConfigPlayerAttributes', ['$http', function ($http) {
    return {
        attributes: $http.get('/api/playersattributes').then(function (data) {
            return data.data;
        })
    };
}]);