var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'RegistrationController'
    }).
    when('/register', {
      templateUrl: 'partials/register.html',
      controller: 'RegistrationController'
    }).
    when('/success', {
      templateUrl: 'partials/success.html',
      controller: 'SuccessController'
    }).
    otherwise({
      redirectTo: '/login'
    });
}]);