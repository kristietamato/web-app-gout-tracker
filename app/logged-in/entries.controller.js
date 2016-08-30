myApp.controller('EntriesController', ['$scope', '$rootScope', '$firebaseArray', '$location', 'EntryService',
  function($scope, $rootScope, $firebaseArray, $location, EntryService) {

    var auth = firebase.auth();
    var database = firebase.database();

    $scope.entry = {
      startDate: new Date(),
      endDate: new Date()
    };

    auth.onAuthStateChanged(function(authUser) {
      if (authUser) {
        var entriesRef = database.ref('users/' + $rootScope.currentUser.$id + '/entries');
        var entriesInfo = $firebaseArray(entriesRef);

        $scope.entries = entriesInfo;

        $scope.addEntry = function() {
          entriesInfo.$add({
            'startDate': $scope.entry.startDate.toString(),
            'endDate': $scope.entry.endDate.toString(),
            'painLevel': $scope.entry.painLevel,
            'joint': $scope.entry.joint,
            'description': $scope.entry.description
          }).then(function() {
            $scope.entry.painLevel = '';
            $scope.entry.joint = '';
            $scope.entry.description = '';
            $scope.entry.startDate = '';
            $scope.entry.endDate = '';
          });
        };

        $scope.deleteEntry = function(entryKey) {
          $scope.entries.$remove(entryKey);
        };
      }
    });

    // Google Charts
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Location');
      data.addColumn('date', 'Start Date of Occurence');
      data.addColumn('date', 'End Date of Occurence');

      data.addRows([
        ['Right big toe', $scope.entry.startDate, $scope.entry.endDate],
        ['Left big toe', new Date(2001, 8, 5), new Date(2002, 1, 5)],
        ['Right ankle', new Date(2002, 8, 5), new Date(2003, 1, 5)],
        ['Left ankle', new Date(2003, 8, 5), new Date(2004, 1, 5)],
        ['Right elbow', new Date(2004, 8, 5), new Date(2005, 1, 5)],
        ['Left elbow', new Date(2005, 8, 5), new Date(2006, 1, 5)],
        ['Right finger(s)', new Date(2006, 8, 5), new Date(2007, 1, 5)],
        ['Left finger(s)', new Date(2007, 8, 5), new Date(2008, 1, 5)],
        ['Other', new Date(2008, 8, 5), new Date(2009, 1, 5)],
        ['Right big toe', new Date(2008, 8, 5), new Date(2009, 1, 5)],
        ['Left big toe', new Date(2010, 8, 5), new Date(2012, 1, 5)],
        ['Right ankle', new Date(2010, 8, 5), new Date(2013, 1, 5)],
      ]);

      var options = {
        height: 450,
        timeline: {
          groupByRowLabel: true
        }
      };

      var chart = new google.visualization.Timeline(document.getElementById('chart_div'));

      chart.draw(data, options);
    }

  }
]);
