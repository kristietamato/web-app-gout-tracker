myApp.controller('EntryController', ['$scope', '$rootScope',
function($scope, $rootScope) {
  $rootScope.date = {
          startDate: moment().subtract(1, "days"),
          endDate: moment()
      };
  $rootScope.singleDate = moment();

}]);
