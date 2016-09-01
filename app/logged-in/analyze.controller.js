myApp.controller('AnalyzeController', ['$scope', '$rootScope', '$location', 'EntryService',
  function($scope, $rootScope, $location, EntryService) {
    var barsVisualization;
    var entriesData = EntryService.getEntries();
    // Google Charts
    google.charts.setOnLoadCallback(timelineChart);
    google.charts.setOnLoadCallback(barChart);

    function timelineChart() {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Location');
      data.addColumn('date', 'Start Date of Occurence');
      data.addColumn('date', 'End Date of Occurence');

      for (i = 0; i < entriesData.length; i++) {
        data.addRow([entriesData[i].joint, new Date(entriesData[i].startDate), new Date(entriesData[i].endDate)]);
      }

      var options = {
        height: 300,
        timeline: {
          groupByRowLabel: true
        }
      };

      var chart = new google.visualization.Timeline(document.getElementById('timeline-chart'));

      chart.draw(data, options);
    }

    function barChart() {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Location');
      data.addColumn('number', 'Pain Intensity (out of 10)');
      for (i = 0; i < entriesData.length; i++) {
        data.addRow([entriesData[i].joint, entriesData[i].painLevel]);
      }

      var options = {
        colors: ['#b4092a'],
        is3D: true,
        vAxis: {
          viewWindow: {
            min: 0,
            max: 10
          },
          ticks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        }
      };

      barsVisualization = new google.visualization.ColumnChart(document.getElementById('bar-chart'));
      barsVisualization.draw(data, options);

      // Add our over/out handlers.
      google.visualization.events.addListener(barsVisualization, 'onmouseover', barMouseOver);
      google.visualization.events.addListener(barsVisualization, 'onmouseout', barMouseOut);
    }

    function barMouseOver(e) {
      barsVisualization.setSelection([e]);
    }

    function barMouseOut(e) {
      barsVisualization.setSelection([{
        'row': null,
        'column': null
      }]);
    }
  }
]);
