myApp.factory('Authentication', ['$rootScope', '$firebaseAuth', 'FIREBASE_DB_URL',
  function($rootScope, $firebaseAuth, FIREBASE_DB_URL) {

  var ref = new Firebase(FIREBASE_DB_URL);
  var auth = $firebaseAuth(ref);

  return {
    login: function(user) {
      $rootScope.message = "Welcome " + $scope.user.email;
    },

    register: function(user) {
      auth.$createUser({
        email: user.email,
        password: user.password
      }).then(function(regUser) {
        $rootScope.message = "Hi " + user.firstname +
        ", Thanks for registering";
      }).catch(function(error) {
        $rootScope.message = error.message;
      });
    }
  };
}]);
