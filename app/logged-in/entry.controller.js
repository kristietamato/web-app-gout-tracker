myApp.controller('EntryController', ['$scope', 'Authentication', function($scope, Authentication) {
  $scope.date = {
          startDate: moment().subtract(1, "days"),
          endDate: moment()
      };
  $scope.singleDate = moment();

  $scope.addEntry = function() {
    Authentication.addEntry($scope.entry);
  };
}]);
