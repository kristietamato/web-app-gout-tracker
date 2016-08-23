myApp.controller('HistoryController', ['$scope', 'EntryService', '$firebaseArray',
function($scope, EntryService, $firebaseArray) {
  $scope.entries = EntryService.getEntries();
    $scope.deleteEntry = function(entryKey) {
      $scope.entries.$remove(entryKey);
    };
}]);