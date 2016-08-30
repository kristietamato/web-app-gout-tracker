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

            // Google Charts
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
              var data = new google.visualization.DataTable();
              data.addColumn('string', 'Location');
              data.addColumn('date', 'Start Date of Occurence');
              data.addColumn('date', 'End Date of Occurence');

              for(i = 0; i < entriesData.length; i++) {
                data.addRow([entriesData[i].joint, new Date(entriesData[i].startDate), new Date(entriesData[i].endDate)]);
              }

              var options = {
                height: 450,
                timeline: {
                  groupByRowLabel: true
                }
              };

              var chart = new google.visualization.Timeline(document.getElementById('chart_div'));

              chart.draw(data, options);
            }

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
            return $scope.entries;
          }
        });
    }
  }
]);
