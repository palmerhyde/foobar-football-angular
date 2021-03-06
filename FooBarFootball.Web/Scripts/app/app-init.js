﻿
var fooBarControllers = angular.module('fooBarControllers', []);

var fooBarApp = angular.module('fooBarApp', ['ngRoute', 'firebase', 'fooBarControllers', 'ngCookies']);

fooBarApp.run(['$rootScope', '$location', 'AuthenticationService', function ($rootScope, $location, AuthenticationService) {

  // enumerate routes that don't need authentication
  var routesThatRequireAuth = ['/simulator/firebase'];

  // check if current location matches route  
  var routeAuth = function (route) {
    return _.find(routesThatRequireAuth,
      function (AuthRoute) {
        return route.indexOf(AuthRoute) > -1;
      });
  };

  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    // if route requires auth and user is not logged in
    if (routeAuth($location.url()) && !AuthenticationService.isLoggedIn()) {
      // redirect back to login
      $location.path('/login');
    }
  });
}]);

fooBarApp.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
          when('/', {
              templateUrl: 'Scripts/app/views/home.html',
              controller: 'HomeController'
          }).
        when('/cards', {
            templateUrl: 'Scripts/app/views/cards.html',
            controller: 'CardsController'
        }).
        when('/cards/players', {
            templateUrl: 'Scripts/app/views/player-cards.html',
            controller: 'PlayersCardsController'
        }).
        when('/cards/poker', {
            templateUrl: 'Scripts/app/views/poker-cards.html',
            controller: 'PokerPlayersCardsController'
        }).
        when('/cards/moves', {
            templateUrl: 'Scripts/app/views/move-cards.html',
            controller: 'MoveCardsController'
        }).
        when('/cards/managers', {
              templateUrl: 'Scripts/app/views/manager-cards.html',
              controller: 'ManagerCardsController'
          }).
        when('/cards/tactics', {
            templateUrl: 'Scripts/app/views/tactic-cards.html',
            controller: 'TacticCardsController'
        }).
          when('/cards/print', {
              templateUrl: 'Scripts/app/views/print.html',
              controller: 'PrintCardsController'
          }).
          when('/simulator', {
              templateUrl: 'Scripts/app/views/simulator.html',
              controller: 'SimulatorController'
          }).
        when('/simulator/moves', {
            templateUrl: 'Scripts/app/views/simulator-moves.html',
            controller: 'SimulatorMovesController'
        }).
        when('/simulator/signalr', {
            templateUrl: 'Scripts/app/views/signalr.html',
            controller: 'SignalrController'
        }).
        when('/simulator/firebase/:id', {
            templateUrl: 'Scripts/app/views/games.html',
            controller: 'GamesController'
        }).
        when('/wiki', {
            templateUrl: 'Scripts/app/views/wiki.html',
            controller: 'WikiController'
        }).
          when('/demo', {
              templateUrl: 'Scripts/app/views/demo.html',
              controller: 'DemoController'
          }).
          when('/login', {
              templateUrl: 'Scripts/app/views/login.html',
              controller: 'LoginController'
          }).
        otherwise({
            redirectTo: '/'
        });
  }]);



