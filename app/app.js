var myApp = angular.module('myApp', ['ngRoute', 'firebase', 'ui.bootstrap.datetimepicker']);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/login', {
      templateUrl: 'authentication/partials/login.html',
      controller: 'AuthController',
      controllerAs: 'authCtrl'
    }).
    when('/register', {
      templateUrl: 'authentication/partials/register.html',
      controller: 'AuthController',
      controllerAs: 'authCtrl'
    }).
    when('/entries', {
      templateUrl: 'logged-in/partials/entries.html',
      controller: 'EntriesController',
      controllerAs: 'entriesCtrl'
    }).
    when('/analyze', {
      templateUrl: 'logged-in/partials/analyze.html',
      controller: 'AnalyzeController',
      controllerAs: 'analyzeCtrl'
    }).
    when('/settings', {
      templateUrl: 'logged-in/partials/settings.html',
      controller: 'SettingsController',
      controllerAs: 'settingsCtrl'
    }).
    otherwise({
      redirectTo: '/login'
    });
}]);
