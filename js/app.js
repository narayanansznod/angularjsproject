var app = angular.module("myApp", ['ngRoute', 'chart.js', 'tc.chartjs', 'wu.masonry']);
//var chart = angular.module("myApp", ['highcharts-ng']);
app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "chart.html"
        })
        .when("/chart", {
            templateUrl: "chart.html"
        })
        .when("/news", {
            templateUrl: "news.html"
        })
        .when("/blue", {
            templateUrl: "blue.html"
        });
});



            // Directive for generic chart, pass in chart options
           app.directive('hcChart', function () {
                return {
                    restrict: 'E',
                    template: '<div></div>',
                    scope: {
                        options: '='
                    },
                    link: function (scope, element) {
                        Highcharts.chart(element[0], scope.options);
                    }
                };
            })
            // Directive for pie charts, pass in title and data only    
            .directive('hcPieChart', function () {
                return {
                    restrict: 'E',
                    template: '<div></div>',
                    scope: {
                        title: '@',
                        data: '='
                    },
                    link: function (scope, element) {
                        Highcharts.chart(element[0], {
                            chart: {
                                type: 'pie'
                            },
                            title: {
                                text: scope.title
                            },
                            plotOptions: {
                                pie: {
                                    allowPointSelect: true,
                                    cursor: 'pointer',
                                    dataLabels: {
                                        enabled: true,
                                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                                    }
                                }
                            },
                            series: [{
                                data: scope.data
                            }]
                        });
                    }
                };
            })
            .controller('myController', function ($scope) {
                
                // Sample options for first chart
                $scope.chartOptions = {
                    title: {
                        text: 'Temperature data'
                    },
                    xAxis: {
                        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                    },

                    series: [{
                        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
                    }]
                };

                // Sample data for pie chart
                $scope.pieData = [{
                        name: "Microsoft Internet Explorer",
                        y: 56.33
                    }, {
                        name: "Chrome",
                        y: 24.03,
                        sliced: true,
                        selected: true
                    }, {
                        name: "Firefox",
                        y: 10.38
                    }, {
                        name: "Safari",
                        y: 4.77
                    }, {
                        name: "Opera",
                        y: 0.91
                    }, {
                        name: "Proprietary or Undetectable",
                        y: 0.2
                }]
            });

app.controller('classCtrl', function($scope, $http, $timeout) {
    $scope.menuItems = [{
            "href": "#!chart",
            "text": "Analytics",
            "logoLocation": "assets/analityc.png"
        },
        {
            "href": "#!news",
            "text": "News",
            "logoLocation": "assets/newspaper-o.png"
        },
        {
            "href": "#!news",
            "text": "Board Brief",
            "logoLocation": "assets/board-brief.png"
        },
        {
            "href": "#!news",
            "text": "Briefcase",
            "logoLocation": "assets/briefcase.png"
        }
    ];


    // current menu active class

    $scope.activeMenu = $scope.menuItems[0];
    $scope.setActive = function(menuItem) {
        $scope.activeMenu = menuItem;
    };

    // side bar collapse
    $scope.isActive = true;
    $scope.activeButton = function() {
        $scope.isActive = !$scope.isActive;
    };

    $http.get("activity-data.json").then(function(response) {
        $scope.myData = response.data;
        console.log($scope.myData);
    });






});




// app.controller('LineController', function($scope) {

    // $scope.chartData = {

        // labels: [1, 2, 3, 4, 5],
        // datasets: [{
            // label: "My First Dataset",
            // fill: false,
            // lineTension: 0.1,
            // backgroundColor: "rgba(75,192,192,0.4)",
            // borderColor: "rgba(75,192,192,1)",
            // borderCapStyle: 'butt',
            // borderDash: [],
            // borderDashOffset: 0.0,
            // borderJoinStyle: 'miter',
            // pointBorderColor: "rgba(75,192,192,1)",
            // pointBackgroundColor: "#fff",
            // pointBorderWidth: 1,
            // pointHoverRadius: 5,
            // pointHoverBackgroundColor: "rgba(75,192,192,1)",
            // pointHoverBorderColor: "rgba(220,220,220,1)",
            // pointHoverBorderWidth: 2,
            // pointRadius: 1,
            // pointHitRadius: 10,
            // data: [1, 80, 65, 5, 55],
            // spanGaps: false,
        // }]
    // };
    // $scope.chartOptions = {
        // scaleShowVerticalLines: false,
        // maintainAspectRatio: false,
        // legend: {
            // display: true,
            // position: 'right'

        // },
        // scales: {
            // xAxes: [{
                // display: true,
                // gridLines: { display: false },
                // scaleLabel: {

                    // display: true,
                    // labelString: 'as'
                // },
                // time: {
                    // unit: 'minute'
                // }

            // }],
            // yAxes: [{

                // display: true,
                // scaleLabel: {

                    // display: true,
                    // labelString: 'da',

                // },
                // ticks: {
                    // max: 100,
                    // min: 0,
                    // stepSize: 50,
                    // callback: function(value, index, values) {
                        // return value + 'km';
                    // }
                // }
            // }]
        // },
        // title: {
            // display: true,
            // text: 'Chart.js Line Chart - Legend'
        // }
    // };

    // $scope.onChartClick = function(event) {
        // console.log('LineController', 'onChartClick', event);
    // };
// });


// app.controller('customersCtrl', function($scope, $http) {
           // $http.get("customers.json").then(function (response) {
               // $scope.myData = response.data.records;
           // });
         // });
		 
		 


app.controller('newsController', function($scope) {
    $scope.newsItem = [{
            "title": "Chain Store Age",
            "date": "Feb 22, 2016",
            "caption": "Billabong taps NetSuite to power omnichannel strategy",
            "newsImg": "assets/list-box-im1.png",

            "thumbs": "132"
        }, {
            "title": "Chain Store Age",
            "date": "Feb 22, 2016",
            "caption": "Billabong taps NetSuite to power omnichannel strategy",
            "newsImg": "assets/list-box-im1.png",
            "desc": "Marianne WilsonNetSuite Inc., a provider of cloud-based financials, ERP and and omnichannel software suites, said that boardsports retailer Billabong International Ltd. selected NetSuite...",
            "thumbs": "132"
        }, {
            "title": "Chain Store Age",
            "date": "Feb 22, 2016",
            "caption": "Billabong taps NetSuite to power omnichannel strategy",
            "newsImg": "assets/list-box-im1.png",
            "desc": "Marianne WilsonNetSuite Inc., a provider of cloud-based financials, ERP and and omnichannel software suites, said that boardsports retailer Billabong International Ltd. selected NetSuite...",
            "thumbs": "132"
        }, {
            "title": "Chain Store Age",
            "date": "Feb 22, 2016",
            "caption": "Billabong taps NetSuite to power omnichannel strategy",
            "newsImg": "assets/list-box-im1.png",
            "desc": "Marianne WilsonNetSuite Inc., a provider of cloud-based financials, ERP and and omnichannel software suites, said that boardsports retailer Billabong International Ltd. selected NetSuite...",
            "thumbs": "132"
        }, {
            "title": "Chain Store Age",
            "date": "Feb 22, 2016",
            "caption": "Billabong taps NetSuite to power omnichannel strategy",
            "newsImg": "assets/list-box-im1.png",

            "thumbs": "132"
        }, {
            "title": "Chain Store Age",
            "date": "Feb 22, 2016",
            "caption": "Billabong taps NetSuite to power omnichannel strategy",
            "newsImg": "assets/list-box-im1.png",
            "desc": "Marianne WilsonNetSuite Inc., a provider of cloud-based financials, ERP and and omnichannel software suites, said that boardsports retailer Billabong International Ltd. selected NetSuite...",
            "thumbs": "132"
        }, {
            "title": "Chain Store Age",
            "date": "Feb 22, 2016",
            "caption": "Billabong taps NetSuite to power omnichannel strategy",
            "newsImg": "assets/list-box-im1.png",
            "desc": "Marianne WilsonNetSuite Inc., a provider of cloud-based financials, ERP and and omnichannel software suites, said that boardsports retailer Billabong International Ltd. selected NetSuite...",
            "thumbs": "132"
        }, {
            "title": "Chain Store Age",
            "date": "Feb 22, 2016",
            "caption": "Billabong taps NetSuite to power omnichannel strategy",
            "newsImg": "assets/list-box-im1.png",
            "desc": "Marianne WilsonNetSuite Inc., a provider of cloud-based financials, ERP and and omnichannel software suites, said that boardsports retailer Billabong International Ltd. selected NetSuite...",
            "thumbs": "132"
        }, {
            "title": "Chain Store Age",
            "date": "Feb 22, 2016",
            "caption": "Billabong taps NetSuite to power omnichannel strategy",
            "newsImg": "assets/list-box-im1.png",
            "desc": "Marianne WilsonNetSuite Inc., a provider of cloud-based financials, ERP and and omnichannel software suites, said that boardsports retailer Billabong International Ltd. selected NetSuite...",
            "thumbs": "132"
        }, {
            "title": "Chain Store Age",
            "date": "Feb 22, 2016",
            "caption": "Billabong taps NetSuite to power omnichannel strategy",
            "newsImg": "assets/list-box-im1.png",
            "desc": "Marianne WilsonNetSuite Inc., a provider of cloud-based financials, ERP and and omnichannel software suites, said that boardsports retailer Billabong International Ltd. selected NetSuite...",
            "thumbs": "132"
        }, {
            "title": "Chain Store Age",
            "date": "Feb 22, 2016",
            "caption": "Billabong taps NetSuite to power omnichannel strategy",
            "newsImg": "assets/list-box-im1.png",
            "desc": "Marianne WilsonNetSuite Inc., a provider of cloud-based financials, ERP and and omnichannel software suites, said that boardsports retailer Billabong International Ltd. selected NetSuite...",
            "thumbs": "132"
        }, {
            "title": "Chain Store Age",
            "date": "Feb 22, 2016",
            "caption": "Billabong taps NetSuite to power omnichannel strategy",
            "newsImg": "assets/list-box-im1.png",
            "desc": "Marianne WilsonNetSuite Inc., a provider of cloud-based financials, ERP and and omnichannel software suites, said that boardsports retailer Billabong International Ltd. selected NetSuite...",
            "thumbs": "132"
        }, {
            "title": "Chain Store Age",
            "date": "Feb 22, 2016",
            "caption": "Billabong taps NetSuite to power omnichannel strategy",
            "newsImg": "assets/list-box-im1.png",
            "desc": "Marianne WilsonNetSuite Inc., a provider of cloud-based financials, ERP and and omnichannel software suites, said that boardsports retailer Billabong International Ltd. selected NetSuite...",
            "thumbs": "132"
        }, {
            "title": "Chain Store Age",
            "date": "Feb 22, 2016",
            "caption": "Billabong taps NetSuite to power omnichannel strategy",

            "desc": "Marianne WilsonNetSuite Inc., a provider of cloud-based financials, ERP and and omnichannel software suites, said that boardsports retailer Billabong International Ltd. selected NetSuite...",
            "thumbs": "132"
        }, {
            "title": "Chain Store Age",
            "date": "Feb 22, 2016",
            "caption": "Billabong taps NetSuite to power omnichannel strategy",
            "newsImg": "assets/list-box-im1.png",
            "desc": "Marianne WilsonNetSuite Inc., a provider of cloud-based financials, ERP and and omnichannel software suites, said that boardsports retailer Billabong International Ltd. selected NetSuite...",
            "thumbs": "132"
        }, {
            "title": "Chain Store Age",
            "date": "Feb 22, 2016",
            "caption": "Billabong taps NetSuite to power omnichannel strategy",
            "newsImg": "assets/list-box-im1.png",
            "desc": "Marianne WilsonNetSuite Inc., a provider of cloud-based financials, ERP and and omnichannel software suites, said that boardsports retailer Billabong International Ltd. selected NetSuite...",
            "thumbs": "132"
        }, {
            "title": "Chain Store Age",
            "date": "Feb 22, 2016",
            "caption": "Billabong taps NetSuite to power omnichannel strategy",
            "newsImg": "assets/list-box-im1.png",
            "desc": "Marianne WilsonNetSuite Inc., a provider of cloud-based financials, ERP and and omnichannel software suites, said that boardsports retailer Billabong International Ltd. selected NetSuite...",
            "thumbs": "132"
        }, {
            "title": "Chain Store Age",
            "date": "Feb 22, 2016",
            "caption": "Billabong taps NetSuite to power omnichannel strategy",
            "newsImg": "assets/list-box-im1.png",
            "desc": "Marianne WilsonNetSuite Inc., a provider of cloud-based financials, ERP and and omnichannel software suites, said that boardsports retailer Billabong International Ltd. selected NetSuite...",
            "thumbs": "132"
        }, {
            "title": "Chain Store Age",
            "date": "Feb 22, 2016",
            "caption": "Billabong taps NetSuite to power omnichannel strategy",
            "newsImg": "assets/list-box-im1.png",
            "desc": "Marianne WilsonNetSuite Inc., a provider of cloud-based financials, ERP and and omnichannel software suites, said that boardsports retailer Billabong International Ltd. selected NetSuite...",
            "thumbs": "132"
        }

    ];




});