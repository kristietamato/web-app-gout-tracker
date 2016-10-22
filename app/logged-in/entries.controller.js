myApp.controller('EntriesController', ['$scope', '$rootScope', '$firebase', '$firebaseArray', '$location', 'EntryService',
  function($scope, $rootScope, $firebase, $firebaseArray, $location, EntryService) {

    var auth = firebase.auth();
    var database = firebase.database();
    var entriesRef = database.ref('users/' + $rootScope.currentUser.$id + '/entries');
    var entriesData = $firebaseArray(entriesRef);

    $scope.orderEntries = "startDate";
    $scope.direction = null;

    $scope.entry = {
      startDate: new Date(),
      endDate: new Date()
    };

    createEntries(entriesRef, entriesData);

    function createEntries(entriesRef, entriesInfo) {
      // Run only if user is authenticated
      auth.onAuthStateChanged(function(authUser) {
        if (authUser) {

          $scope.entries = entriesData;

          EntryService.setEntries(entriesData);

          entriesInfo.$loaded().then(function(data) {
            $scope.entriesCount = entriesInfo.length;
          });

          entriesInfo.$watch(function(data) {
            $scope.entriesCount = entriesInfo.length;
          });

          $scope.addEntry = function() {
            var painIntensity = parseInt($scope.entry.painLevel);

            entriesInfo.$add({
              'startDate': $scope.entry.startDate.toLocaleString(),
              'endDate': $scope.entry.endDate.toLocaleString(),
              'painLevel': painIntensity,
              'joint': $scope.entry.joint,
              'description': $scope.entry.description
            }).then(function() {
              $scope.entry.painLevel = undefined;
              $scope.entry.joint = '';
              $scope.entry.description = '';
              $scope.entry.startDate = '';
              $scope.entry.endDate = '';
            });
          };

          $scope.deleteEntry = function(entryKey) {
            $scope.entries.$remove(entryKey);
          };
          return $scope.entries;
        } else {
          $rootScope.currentUser = '';
          $rootScope.$apply(function() {
            $location.path('/login');
          });
        }
      });
    }
  }
]);
