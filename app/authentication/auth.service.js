myApp.factory('Authentication',
['$rootScope', '$firebase', '$location', '$firebaseObject',
function($rootScope, $firebase, $location, $firebaseObject) {

  var auth = firebase.auth();
  var database = firebase.database();
  var usersRef = database.ref('users');
  var dataRef = usersRef.child('entries');

  auth.onAuthStateChanged(function(authUser) {
    if (authUser) {
        var userRef = database.ref('users/' + authUser.uid);
        var userObj = $firebaseObject(userRef);
        $rootScope.currentUser = userObj;
    } else {
      $rootScope.currentUser = '';
      $rootScope.$apply(function (){
        $location.path('/login');
      });
    }
  });

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
          $rootScope.message = "Thank you for registering, " + user.firstname;
        });
      }).catch(function (error) {
        $rootScope.$apply(function (){
          $rootScope.message = error.message;
        });
      });
    },

    addEntry: function (entry) {
      dataRef.update({
        painLevel: entry.painLevel,
        joint: entry.joint
      });
    },

    logout: function () {
      auth.signOut();
    },
  };
}]);
