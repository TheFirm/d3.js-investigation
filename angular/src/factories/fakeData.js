APP.factory('FakeData', function ($http) {
    var self = this;

    self.generate = function (options) {
        var data = [],
            size = ( options && options.size ) || 20,
            min = ( options && options.min ) || 0,
            max = ( options && options.max ) || 100;

        for (var i = 0; i < size; i++) {
            var number = min + Math.round(Math.random() * max);
            data.push(number);
        }

        console.log('FakeData factory: generated data:' + JSON.stringify(data));

        return data;
    }

    return self;
});