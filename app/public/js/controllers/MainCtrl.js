app.controller('MainCtrl', ['$scope', '$timeout', '$mdDialog', '$mdSidenav', '$http', '$location', '$mdToast', '$animate',
  function($scope, $timeout, $mdDialog, $mdSidenav, $http, $location, $mdToast, $animate) {
    var data = {
      labels: [],
      datasets: [
        {
          label: "Pool",
          fillColor: "rgba(213,87,59,0.1)",
          strokeColor: "rgba(213,87,59,1)",
          pointColor: "rgba(213,87,59,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: []
        },
        {
          label: "Solar Panel 1",
          fillColor: "rgba(119,125,167,0.1)",
          strokeColor: "rgba(119,125,167,1)",
          pointColor: "rgba(119,125,167,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: []
        },
        {
          label: "Solar Panel 2",
          fillColor: "rgba(148,201,169,0.1)",
          strokeColor: "rgba(148,201,169,1)",
          pointColor: "rgba(148,201,169,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: []
        },
        {
          label: "Solar Panel 2",
          fillColor: "rgba(198,236,174,0.1)",
          strokeColor: "rgba(198,236,174,1)",
          pointColor: "rgba(198,236,174,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: []
        },
        {
          label: "Ambient",
          fillColor: "rgba(136,80,83,0.1)",
          strokeColor: "rgba(136,80,83,1)",
          pointColor: "rgba(136,80,83,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: []
        }
      ]
    };

    var chartOptions = {
      responsive: true,
      animation: false,
      legendTemplate : '<ul>'
                  +'<% for (var i=0; i<datasets.length; i++) { %>'
                    +'<li>'
                    +'<span style=\"background-color:<%=datasets[i].pointColor%>\">'
                    +'<% if (datasets[i].label) { %><%= datasets[i].label %><% } %>'
                    +'</span>'
                  +'</li>'
                +'<% } %>'
              +'</ul>'
    };


    $scope.toggleSidenav = function(menuId) {
      $mdSidenav(menuId).toggle();
    };
    $scope.title = "PoolMonit";

    // Begin by updating/getting the temps
    $http.get('/api/temps').success(function(result) { 
      var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

      for (var i=0; i <result.temps.length; i++){
        var tmp = new Date(result.temps[i].date);
        var mins = tmp.getMinutes().toString();
        
        if (mins.length === 1){
          mins = '0' + mins;
        }

        result.temps[i].date = weekday[tmp.getDay()] + ' ' + tmp.getDate() + ', ' + tmp.getHours() + ":" + mins;
      }

      $scope.temps = result.temps;
      $mdToast.show(
        $mdToast.simple().content("Data fetched")
      );

      // Set the chart values
      for (var i = result.temps.length-1; i > 0; i--){
        //Show date in hourly format
        data.labels.push(result.temps[i].date);

        //Temps
        data.datasets[0].data.push(result.temps[i].pool);
        data.datasets[1].data.push(result.temps[i].sol1);
        data.datasets[2].data.push(result.temps[i].sol2);
        data.datasets[3].data.push(result.temps[i].sol3);
        data.datasets[4].data.push(result.temps[i].ambient);
      }

    }).error(function(err) {
      console.log(err);
      $mdToast.show(
        $mdToast.simple().content("Error fetching data!")
      );
    });

    $scope.viewLoaded = function() {
      var ctx = $("canvas").get(0).getContext("2d");
      // This will get the first returned node in the jQuery collection.
      var lineChart = new Chart(ctx).Line(data, chartOptions);
      var legend = lineChart.generateLegend();
      $('#chart-container').append(legend);
    };

  }
]);