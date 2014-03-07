fooBarApp.value('$', $);
fooBarApp.service('signalr', ['$', '$rootScope', function ($, $rootScope) {
    var proxy = null;

    var test = function () {
        console.log('test called');
    };

    var initialize = function () {
        //Getting the connection object
        connection = $.hubConnection();

        //Creating proxy
        this.proxy = connection.createHubProxy('gameHub');

        //Publishing "join" event to the Signalr hub
        this.proxy.on('join', function (data) {
            console.log("callback from hub...");
            //$rootScope.$emit("join", data);
        });

        this.proxy.on('teamExists', function () {
            console.log("callback from teamExists on the hub...");
            $rootScope.$emit("teamExists");
        });

        this.proxy.on('playerJoined', function () {
            console.log("callback from playerJoined on the hub...");
            $rootScope.$emit("playerJoined");
        });

        this.proxy.on('buildBoard', function () {
            console.log("callback from buildboard on the hub...");
            $rootScope.$emit("buildBoard");
        });

        this.proxy.on('waitingList', function () {
            console.log("callback from waitingList on the hub...");
            $rootScope.$emit("waitingList");
        });

        // VERY IMPORTANT - Make sure that the client / server proxy events are defined ***BEFORE*** calling start.
        connection.start().done(function () {
            console.log('hub is ready');
        });
    };

    var join = function (username) {
        console.log('calling join on the game hub');
        this.proxy.invoke('join', username);
    };

    return {
        test: test,
        join: join,
        initialize: initialize,
    };
}]);