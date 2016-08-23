myApp.controller('HistoryController', ['$scope', 'EntryService',
function($scope, EntryService) {
  $scope.entries = EntryService.getEntries();
}]);