var myApp = angular.module('myApp', ['ngRoute', 'firebase']);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'AuthController',
      controllerAs: 'authCtrl'
    }).
    when('/register', {
      templateUrl: 'partials/register.html',
      controller: 'AuthController',
      controllerAs: 'authCtrl'
    }).
    when('/success', {
      templateUrl: 'partials/success.html',
      controller: 'SuccessController',
      controllerAs: 'authCtrl'
    }).
    otherwise({
      redirectTo: '/login'
    });
}]);