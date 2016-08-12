var myApp = angular.module('myApp', ['ngRoute', 'firebase']);

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
    when('/home', {
      templateUrl: 'logged-in/partials/home.html',
      controller: 'HomeController',
      controllerAs: 'homeCtrl'
    }).
    when('/entry', {
      templateUrl: 'logged-in/partials/add-entry.html',
      controller: 'EntryController',
      controllerAs: 'entryCtrl'
    }).
    when('/history', {
      templateUrl: 'logged-in/partials/entry-history.html',
      controller: 'HistoryController',
      controllerAs: 'historyCtrl'
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
    when('/logout', {
      templateUrl: 'logged-in/partials/logout.html',
      controller: 'LogoutController',
      controllerAs: 'logoutCtrl'
    }).
    otherwise({
      redirectTo: '/login'
    });
}]);