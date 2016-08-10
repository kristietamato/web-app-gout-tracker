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
    when('/success', {
      templateUrl: 'logged-in/partials/success.html',
      controller: 'SuccessController',
      controllerAs: 'authCtrl'
    }).
    otherwise({
      redirectTo: '/login'
    });
}]);