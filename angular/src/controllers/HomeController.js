
APP.controller('HomeController', [ '$scope', 'FakeData', function($scope, fakeDataFactory) {
    $scope.test = "Dawn! It Works!";

    $scope.somedata = fakeDataFactory.generate();

    $scope.addData = function() {
        $scope.somedata.push(fakeDataFactory.generate({size: 1}));
        console.log('HomeController: new data' + $scope.somedata);
    }
}]);
