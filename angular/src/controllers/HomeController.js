
APP.controller('HomeController', [ '$scope', '$location', 'FakeData', function($scope, $location, fakeDataFactory) {
    $scope.keys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    $scope.somedata = fakeDataFactory.generate({size: 10});

    $scope.addData = function() {
        $scope.somedata = fakeDataFactory.generate({size: Math.round(4 + Math.random() * 7)});
        console.log('HomeController: new data' + $scope.somedata);
    }

    $scope.lFact = function(value1, index1) {
        return $scope.keys[index1 % $scope.keys.length];
    }

    $scope.loc = $location;
}]);
