myApp.controller('EntryController', ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray',
function($scope, $rootScope, $firebaseAuth, $firebaseArray) {

  $scope.date = {
    startDate: moment().subtract(1, "days"),
    endDate: moment()
  };

  var auth = firebase.auth();
  var database = firebase.database();

  auth.onAuthStateChanged(function(authUser) {
    if (authUser) {
      var entriesRef = database.ref('users/' + $rootScope.currentUser.$id + '/entries');
      var entriesInfo = $firebaseArray(entriesRef);

      $scope.addEntry = function() {
        entriesInfo.$add({
          //startDate: $scope.date.startDate._d,
          //endDate: $scope.date.endDate._d,
          painLevel: $scope.entry.painLevel,
          joint: $scope.entry.joint,
          //description: $scope.entry.description
        });
      }
    }
  });
}]);
