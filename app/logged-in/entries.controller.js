myApp.controller('EntriesController', ['$scope', '$rootScope', '$firebaseArray', '$location', 'EntryService',
  function($scope, $rootScope, $firebaseArray, $location, EntryService) {

    var auth = firebase.auth();
    var database = firebase.database();
    var entriesRef = database.ref('users/' + $rootScope.currentUser.$id + '/entries');
    var entriesData = $firebaseArray(entriesRef);

    $scope.entry = {
      startDate: new Date(),
      endDate: new Date()
    };

    createEntries(entriesRef, entriesData);

    function createEntries(entriesRef, entriesInfo) {
        auth.onAuthStateChanged(function(authUser) {
          if (authUser) {

            $scope.entries = entriesData;

            EntryService.setEntries(entriesData);

            $scope.addEntry = function() {
              var painIntensity = parseInt($scope.entry.painLevel);

              entriesInfo.$add({
                'startDate': $scope.entry.startDate.toString(),
                'endDate': $scope.entry.endDate.toString(),
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
          }
        });
    }
  }
]);
