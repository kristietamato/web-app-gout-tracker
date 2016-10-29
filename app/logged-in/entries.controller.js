myApp.controller('EntriesController', ['$scope', '$rootScope', '$firebase', '$firebaseArray', '$location', 'EntryService',
  function($scope, $rootScope, $firebase, $firebaseArray, $location, EntryService) {

    var entriesRef = database.ref('users/' + $rootScope.currentUser.$id + '/entries');
    var entriesData = $firebaseArray(entriesRef);

    $scope.orderEntries = "startDate";
    $scope.direction = null;

    /* Bindable functions
     -----------------------------------------------*/
    $scope.endDateBeforeRender = endDateBeforeRender
    $scope.endDateOnSetTime = endDateOnSetTime
    $scope.startDateBeforeRender = startDateBeforeRender
    $scope.startDateOnSetTime = startDateOnSetTime

    function startDateOnSetTime () {
      $scope.$broadcast('start-date-changed');
    }

    function endDateOnSetTime () {
      $scope.$broadcast('end-date-changed');
    }

    function startDateBeforeRender ($dates) {
      if ($scope.dateRangeEnd) {
        var activeDate = moment($scope.dateRangeEnd);

        $dates.filter(function (date) {
          return date.localDateValue() >= activeDate.valueOf()
        }).forEach(function (date) {
          date.selectable = false;
        })
      }
    }

    function endDateBeforeRender ($view, $dates) {
      if ($scope.dateRangeStart) {
        var activeDate = moment($scope.dateRangeStart).subtract(1, $view).add(1, 'minute');

        $dates.filter(function (date) {
          return date.localDateValue() <= activeDate.valueOf()
        }).forEach(function (date) {
          date.selectable = false;
        })
      }
    }

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
              'startDate': $scope.dateRangeStart.toLocaleString(),
              'endDate': $scope.dateRangeEnd.toLocaleString(),
              'painLevel': painIntensity,
              'joint': $scope.entry.joint,
              'description': $scope.entry.description
            }).then(function() {
              $scope.entry.painLevel = undefined;
              $scope.entry.joint = '';
              $scope.entry.description = '';
              $scope.dateRangeStart = '';
              $scope.dateRangeEnd = '';
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
