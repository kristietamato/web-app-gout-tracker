myApp.factory('Authentication', ['$rootScope', '$firebase', 'location'
function($rootScope, $firebase, $location) {

  var auth = firebase.auth();

  return {
    login: function (user) {
      auth.$authWithPassword(user.email,  user.password)
      .then(function(regUser) {
        $location.path('/success');
      }).catch(function (error) {
        $rootScope.message = error.message;
      });
    },

    register: function (user) {
      auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(function(regUser) {
        var regRef = new Firebase('https://gout-tracker.firebaseio.com/' + 'users')
        .child(regUser.uid).set({
          date: Firebase.ServerValue.TIMESTAMP,
          regUser: regUser.uid,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email
        });
        $rootScope.message = "Thanks for registering, " + user.firstname;
      }).catch(function (error) {
        $rootScope.message = error.message;
      });
    }
  };
}]);
