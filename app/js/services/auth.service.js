myApp.factory('Authentication', ['$rootScope', '$firebase',
function($rootScope, $firebase) {

  var auth = firebase.auth();

  return {
    login: function (user) {
      auth.signInWithCredential(user.email,  user.password)
      .then(function() {
        $rootScope.message = "Hello " + user.firstname;
      }).catch(function (error) {
        $rootScope.message = error.message;
      });
    },

    register: function (user) {
      auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(function(user) {
        $rootScope.message = "Thanks for registering, " + user.firstname;
      }).catch(function (error) {
        $rootScope.message = error.message;
      });
    }
  };
}]);
