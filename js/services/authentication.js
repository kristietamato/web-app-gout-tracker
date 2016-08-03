myApp.factory('Authentication', ['$rootScope', '$firebase',
function($rootScope, $firebase) {

  var auth = firebase.auth();

  return {
    login: function (user) {
      $rootScope.message = "Welcome " + $scope.user.email;
    },

    register: function (user) {
      auth.createUserWithEmailAndPassword(user.email, user.password)
      .catch(function (error) {
        $rootScope.message = error.message;
      });
    }
  };
}]);
