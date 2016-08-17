myApp.factory('Authentication', ['$rootScope', '$firebase', '$location',
function($rootScope, $firebase, $location) {

  var auth = firebase.auth();
  var database = firebase.database();
  var usersRef = database.ref('users');

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
      .then(function(newUser) {
        usersRef.child(newUser.uid).set({
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email
        });
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
