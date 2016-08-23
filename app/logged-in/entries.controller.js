myApp.controller('EntriesController', ['$scope', '$rootScope', '$firebaseArray', '$location', 'EntryService',
function($scope, $rootScope, $firebaseArray, $location, EntryService) {

  // daterangepicker script http://www.daterangepicker.com/#usage
  var startDateTime = moment().subtract(29, 'days');
  var endDateTime = moment();

  function cb(start, end) {
    $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
  }

  $('#reportrange').daterangepicker({
    startDate: startDateTime,
    endDate: endDateTime,
    ranges: {
      'Today': [moment(), moment()],
      'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'Last 7 Days': [moment().subtract(6, 'days'), moment()],
      'Last 30 Days': [moment().subtract(29, 'days'), moment()],
      'This Month': [moment().startOf('month'), moment().endOf('month')],
      'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    }
  }, cb);

  cb(startDateTime, endDateTime);

  var auth = firebase.auth();
  var database = firebase.database();

  auth.onAuthStateChanged(function(authUser) {
    if (authUser) {
      var entriesRef = database.ref('users/' + $rootScope.currentUser.$id + '/entries');
      var entriesInfo = $firebaseArray(entriesRef);
      cb(startDateTime, endDateTime);

      $scope.entries = entriesInfo;

      $scope.addEntry = function() {
        entriesInfo.$add({
          'startDate': startDateTime._d.toString(),
          'endDate': endDateTime._d.toString(),
          'painLevel': $scope.entry.painLevel,
          'joint': $scope.entry.joint,
          'description': $scope.entry.description
        }).then(function() {
          $scope.entry.painLevel = '';
          $scope.entry.joint = '';
          $scope.entry.description = '';
          startDateTime = moment().subtract(29, 'days');
          endDateTime = moment();
        });
      };

      $scope.deleteEntry = function(entryKey) {
        $scope.entries.$remove(entryKey);
      };
    }
  });
}]);
