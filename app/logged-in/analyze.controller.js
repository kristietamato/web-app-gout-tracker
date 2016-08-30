myApp.controller('AnalyzeController', ['$scope', '$rootScope', '$location', 'EntryService',
  function($scope, $rootScope, $location, EntryService) {
    var entriesData = EntryService.getEntries();
    // Google Charts
    google.charts.setOnLoadCallback(timelineChart);

    function timelineChart() {
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

      var chart = new google.visualization.Timeline(document.getElementById('timeline-chart'));

      chart.draw(data, options);
    }
  }
]);
