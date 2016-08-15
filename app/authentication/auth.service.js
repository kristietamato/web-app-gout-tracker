myApp.factory('Authentication', ['$rootScope', '$firebase', '$location',
function($rootScope, $firebase, $location) {

  var auth = firebase.auth();

  return {
    login: function (user) {
      auth.signInWithEmailAndPassword(user.email,  user.password)
      .then(function(authUser) {
        $rootScope.$apply(function (){
          $location.path('/home');
        });
      }).catch(function (error) {
        $rootScope.$apply(function (){
          $rootScope.message = error.message;
        });
      });
    },

    register: function (user) {
      auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(function(authUser) {
        $rootScope.$apply(function (){
          $location.path('/home');
        });
      }).catch(function (error) {
        $rootScope.$apply(function (){
          $rootScope.message = error.message;
        });
      });
    }
  };
}]);
