var APP = angular.module('test_d3', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'src/partials/home.html',
                controller: 'HomeController'
            })
            .when('/piechart', {
                templateUrl: 'src/partials/pieChart.html',
                controller: 'HomeController'
            })
            .when('/revenue', {
                templateUrl: 'src/partials/revenue.html',
                controller: 'HomeController'
            })

    }])