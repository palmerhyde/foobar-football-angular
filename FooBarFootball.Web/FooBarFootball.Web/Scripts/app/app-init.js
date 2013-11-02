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
          when('/wiki', {
              templateUrl: 'Scripts/app/views/wiki.html',
              controller: 'WikiController'
          }).
        otherwise({
            redirectTo: '/'
        });
  }]);