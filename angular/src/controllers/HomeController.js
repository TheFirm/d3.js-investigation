
APP.controller('HomeController', [ '$scope', '$location', 'FakeData', function($scope, $location, fakeDataFactory) {
    $scope.test = "Dawn! It Works!";

    $scope.somedata = fakeDataFactory.generate({size: 6});

    $scope.addData = function() {
        $scope.somedata.push(fakeDataFactory.generate({size: 1}));
        console.log('HomeController: new data' + $scope.somedata);
    }

    $scope.loc = $location;
}]);
