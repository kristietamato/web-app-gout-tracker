myApp.controller('EntryController', ['$scope', function($scope) {
  $scope.date = {
          startDate: moment().subtract(1, "days"),
          endDate: moment()
      };
  $scope.singleDate = moment();
  $scope.painLevel = null;
  $scope.joint = null;
  $scope.description = null;
}]);
