myApp.controller('AuthController',
  ['$scope', 'Authentication',
  function($scope, Authentication) {
  
  $scope.login = function() {
    Authentication.login($scope.user);
  }; //login

  $scope.register = function() {
    Authentication.register($scope.user);
  }; // register

  $scope.logout = function() {
    Authentication.logout($scope.user);
  }; // logout

}]); // Controller
