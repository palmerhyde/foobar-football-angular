var fooBarControllers = angular.module('fooBarControllers', []);
var fooBarApp = angular.module('fooBarApp', ['ngRoute', 'fooBarControllers']);

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
            controller: 'PlayerCardsController'
        }).
        when('/cards/players2', {
              templateUrl: 'Scripts/app/views/player2-cards.html',
              controller: 'Player2CardsController'
          }).
        when('/cards/moves', {
            templateUrl: 'Scripts/app/views/move-cards.html',
            controller: 'MoveCardsController'
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
        when('/wiki', {
            templateUrl: 'Scripts/app/views/wiki.html',
            controller: 'WikiController'
        }).
        otherwise({
            redirectTo: '/'
        });
  }]);