fooBarApp.service('facebook', [function ($, $rootScope) {

    var username = function () {
        var firstName = ["Liam", "Shane", "Riccardo", "Mike", "Claudio",
                     "Andy", "Jason", "Mike"];

        return firstName[Math.floor(Math.random() * firstName.length)];
    };

    var initialize = function () {
        console.log("Initialising facebook...")
    };

    return {
        initialize: initialize,
        username : username
    };
}]);