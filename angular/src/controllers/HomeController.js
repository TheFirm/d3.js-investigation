
APP.controller('HomeController', [ '$scope', '$location', 'FakeData', function($scope, $location, fakeDataFactory) {
    $scope.keys = ['One', 'Two', 'Three', 'Four'];

    $scope.somedata = fakeDataFactory.generate({size: 3});

    $scope.addData = function() {
        $scope.somedata = fakeDataFactory.generate({size: $scope.somedata.length+1});
        console.log('HomeController: new data' + $scope.somedata);
    }

    $scope.lFact = function(value1, index1) {
        return $scope.keys[index1 % $scope.keys.length];
    }

    $scope.loc = $location;
}]);
