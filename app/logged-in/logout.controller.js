myApp.controller('LogoutController', ['$scope', 'Authentication', function($scope, Authentication) {

  $scope.logout = function() {
    Authentication.logout($scope.user);
  };

}]);
